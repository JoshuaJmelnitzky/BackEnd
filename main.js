const express = require('express');
const productosRutes = require('./Routes/productos/productos')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static(__dirname + '/public'))
app.use("/api", productosRutes);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 })
