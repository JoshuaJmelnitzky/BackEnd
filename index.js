require("dotenv").config();
var methodOverride = require('method-override')
const express = require("express");
const {engine} = require("express-handlebars");
const userRoutes = require('./src/modules/user/userRoutes');
const apiRoutes = require('./src/routes/index');
const randomRoutes = require('./Routes/numberRandom/numberRandom');
const ContenedorNuevo = require('./Routes/chat/chat');
const {faker} = require('@faker-js/faker');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const yargs = require('yargs');
const { MONGO_CONNECTION, MONGO_CONNECTION_ECOMMERCE } = process.env;
const passport = require('./src/middlewares/passport');
const cluster = require('cluster');
const os = require('os');
const {requiereAutenticacion} = require('./src/middlewares/middlewares');


let chat = new ContenedorNuevo();

const app = express();
const numCpu = os.cpus().length;

mongoose.connect(MONGO_CONNECTION_ECOMMERCE );

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_CONNECTION,
        dbName: 'ecommerce',
        ttl: 10 * 60,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'Joshua',
    resave: true,
    rolling: true,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', apiRoutes);
app.use(userRoutes);
app.use("/api/randoms", randomRoutes);
app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", "./views");

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    // layoutsDir: __dirname + "/views/layouts",     => Consultar como escribir esto
    partialsDir: __dirname + "/views/partials",
    }) 
);


app.get('/', requiereAutenticacion, (req, res) => {
    res.render("index", {name: req.session.usuario, idCart: req.session.cart});
})  


// Random data
app.get('/api/productos-test', async (req, res) => {
    const productos = [null,null,null,null,null].map((id) => {
      return {
        id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
      };
    });
    res.render("productos", {data: productos, random: "random"});
});


// Websocket
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) =>{
    console.log("Cliente conectado");

    chat.normalize().then((resp) => {
        socket.emit('mensaje', resp);
    });

    // Current messages
    socket.on("dataChat", (data) => {

        chat.save(data).then( () => {
            console.log("Mensaje añadido");
        
            chat.normalize().then((resp) => {
                //print(resp)
                socket.emit('mensaje', resp);
            });
        });  
    });
});


// Iniciar servidor con puerto pasado por argumento
let arg = process.argv.slice(2);
const parse = yargs(arg).default({
    port: 8080,
    mode: 'fork'
}).alias({
    p: 'port',
    m: 'mode'
}).argv;
const {mode} = parse;


// Modo cluster o fork 
if(mode === 'cluster'){
    if(cluster.isMaster){
        for (let i = 0; i < numCpu; i++) {
            cluster.fork();
        }
    }else{
        const serverOn = server.listen(process.env.PORT  || 8080, () => {
            console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
        });
    }
}else{
    const serverOn = server.listen(process.env.PORT  || 8080, () => {
        console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
    });
}



