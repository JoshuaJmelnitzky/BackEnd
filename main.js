const express = require('express');
const productosRutes = require('./Routes/productos/productos')
const carritosRutes = require('./Routes/carrito/carritos')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productosRutes);
app.use("/api/carrito", carritosRutes);

app.use((req, res) => {
    res.status(404).send(`La ruta ${req.url} que está intentando acceder no se encuentra disponible`);
})

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 })
