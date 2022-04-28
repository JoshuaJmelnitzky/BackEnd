const express = require("express");
const productosRutes = require('../Routes/productos/productos');
const Contenedor = require('../contenedor');

let producto = new Contenedor("Productos");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api", productosRutes);
app.use(express.static('public'));


app.set("view engine", "ejs");
app.set("views", "./ejs/views");


app.get('/productos', (req, res) => {
    producto.getAll().then((prod) => {
        if(prod.length > 0){
            res.render("productos", {data: prod});
        }else{
            res.render("productosEmpty");
        }
    });
})  



const server = app.listen(8080, ()=>{
    console.log(`Servidor corriendo en ${server.address().port}`);
})


