const express = require("express");
const {engine} = require("express-handlebars");
const productosRutes = require('../Routes/productos/productos');
const Contenedor = require('../contenedor');
const {faker} = require('@faker-js/faker');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require("dotenv").config();

let producto = new Contenedor("Productos");
let chat = new Contenedor("mensajes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.mongo__connection,
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
    cookie: {
        maxAge: 60000
    },
    saveUninitialized: false
}));


app.use("/api/productos", productosRutes);
app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", "./handlebars/views");


const requiereAutenticacion = (req, res, next) => {
    if (req.session.usuario) return next();
    res.render('logIn');
};


const rechazaAutenticado = (req, res, next)=> {
    if (req.session.usuario) return res.render('index', {name: req.session.usuario});
    next();
};


app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    // layoutsDir: __dirname + "/views/layouts",     => Consultar como escribir esto
    partialsDir: __dirname + "/views/partials",
    }) 
);


app.get('/productos', (req, res) => {
    producto.getAll().then((prod) => {
        if(prod.length > 0){
            res.render("productos", {data: prod});
        }else{
            res.render("productosEmpty");
        }
    });
});


app.get('/login', rechazaAutenticado, (req, res) => {
    res.render("logIn");
});


app.post("/login", rechazaAutenticado, (req,res)=> {
   req.session.usuario = req.body.name;
   res.redirect('./');
})


app.get('/logout', requiereAutenticacion, (req, res) => {
    const user = req.session.usuario;
    req.session.destroy((err) => {
        console.log(err);
        res.render('logOut', {name: user});
    });
});


app.get('/', requiereAutenticacion, (req, res) => {
    res.render("index", {name: req.session.usuario});
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


const serverOn = server.listen(8080, () => {
    console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
});