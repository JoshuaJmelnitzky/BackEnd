const express = require("express");
const {engine} = require("express-handlebars");
const productosRutes = require('../Routes/productos/productos');
const Contenedor = require('../contenedor');

let producto = new Contenedor("Productos");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api", productosRutes);
app.use(express.static('public'));


app.set("view engine", "hbs");
app.set("views", "./handlebars/views");


app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
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


const server = app.listen(8080, ()=>{
    console.log(`Servidor corriendo en ${server.address().port}`);
})


