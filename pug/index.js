const express = require("express");
const productosRutes = require('../Routes/productos/productos');
const Contenedor = require('../contenedor');

let producto = new Contenedor("Productos");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/api", productosRutes);
app.use(express.static('public'));


app.set("view engine", "pug");
app.set("views", "./pug/views");


app.get('/productos', (req, res) => {
    producto.getAll().then((prod) => {
        res.render("productos", {data: prod})
    });
})  


const server = app.listen(8080, ()=>{
    console.log(`Servidor corriendo en ${server.address().port}`)
})


