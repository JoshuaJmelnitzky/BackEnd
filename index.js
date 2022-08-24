const express = require("express");
const {engine} = require("express-handlebars");
const productosRutes = require('./Routes/productos/productos');
const randomRoutes = require('./Routes/numberRandom/numberRandom');
const Contenedor = require('./contenedor');
const {faker} = require('@faker-js/faker');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require("dotenv").config();
const yargs = require('yargs');
const { MONGO_CONNECTION } = process.env;
const passport = require('./src/passport');
const cluster = require('cluster');
const os = require('os');


let producto = new Contenedor("Productos");
let chat = new Contenedor("mensajes");

const app = express();
const numCpu = os.cpus().length;

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


app.use("/api/productos", productosRutes);
app.use("/api/randoms", randomRoutes);
app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", "./handlebars/views");


// Midlewares
const requiereAutenticacion = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.render('logIn');
};


const rechazaAutenticado = (req, res, next)=> {
    if (req.isAuthenticated()) return res.render('index', {name: req.session.usuario});
    next();
};


app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    // layoutsDir: __dirname + "/views/layouts",     => Consultar como escribir esto
    partialsDir: __dirname + "/views/partials",
    }) 
);


app.get('/', requiereAutenticacion, (req, res) => {
    res.render("index", {name: req.session.usuario});
})  


app.get('/productos', (req, res) => {
    producto.getAll().then((prod) => {
        if(prod.length > 0){
            res.render("productos", {data: prod});
        }else{
            res.render("productosEmpty");
        }
    });
});


// Rutas de registro de nuevo usuario.
app.get("/signup", rechazaAutenticado, (req,res)=> {
    res.render("signup");
});


app.post('/signup', passport.authenticate('signup', {failureRedirect: '/failsignup', failureMessage: true}), (req, res) => {
    res.render('login');
});


app.get("/failsignup", rechazaAutenticado, (req,res)=> {
    res.render("failedSignUp");
});


// Rutas de inicio de sesión de usuario ya registrado
app.get('/login', rechazaAutenticado, (req, res) => {
    res.render("logIn");
});


app.post("/login", passport.authenticate('login', {failureRedirect: '/faillogin', failureMessage: true}), (req,res)=> {
    req.session.usuario = req.body.username;
    res.redirect('./');
})


app.get("/faillogin", rechazaAutenticado, (req,res)=> {
    res.render("failedLogIn");
});


// Cerrar sesión
app.get('/logout', requiereAutenticacion, (req, res) => {
    const user = req.session.usuario;
    req.session.destroy((err) => {
        console.log(err);
        res.render('logOut', {name: user});
    });
});


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


// Info del objeto process
app.get('/info', async (req, res) => {
    if (arg.length === 0){
        arg = 'No se ingresaron argumentos';
    }

    const info = {
        inputArguments: arg,
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage().rss + ' bytes',
        path: process.execPath,
        id: process.pid,
        folder: process.cwd(),
        cpus: numCpu
    }
    res.render('info', {info, puerto});
});


// Websocket
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) =>{
    console.log("Cliente conectado");

    // Previous messages
   
    chat.normalize().then((resp) => {
        socket.emit('mensaje', resp);
    });

    // Current messages
    socket.on("dataChat", (data) => {

        chat.save(data).then( () => {
            console.log("Mensaje añadido");
        
            chat.normalize().then((resp) => {
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
const {port, mode} = parse;

// Modo cluster o fork 
if(mode === 'cluster'){
    if(cluster.isMaster){
        for (let i = 0; i < numCpu; i++) {
            cluster.fork();
        }
    }else{
        const serverOn = server.listen(port, () => {
            console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
        });
    }
}else{
    const serverOn = server.listen(port, () => {
        console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
    });
}


