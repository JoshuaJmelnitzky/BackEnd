const express = require("express");
const {engine} = require("express-handlebars");
const productosRutes = require('../Routes/productos/productos');
const Contenedor = require('../contenedor');
const {faker} = require('@faker-js/faker');
let producto = new Contenedor("Productos");
let chat = new Contenedor("mensajes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/productos", productosRutes);
app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", "./handlebars/views");


app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    // layoutsDir: __dirname + "/views/layouts",     => Consultar como escribir esto
    partialsDir: __dirname + "/views/partials",
    }) 
)


app.get('/productos', (req, res) => {
    producto.getAll().then((prod) => {
        if(prod.length > 0){
            res.render("productos", {data: prod});
        }else{
            res.render("productosEmpty");
        }
    });
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
    console.log("Cliente conectado")

    // Previous messages
   
    chat.normalize().then((resp) => {
        socket.emit('mensaje', resp);
    })

    // Current messages
    socket.on("dataChat", (data) => {

        chat.save(data).then( () => {
            console.log("Mensaje añadido");
        
            chat.normalize().then((resp) => {
                socket.emit('mensaje', resp);
            })
        });  

    });
})



const serverOn = server.listen(8080, () => {
    console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
})