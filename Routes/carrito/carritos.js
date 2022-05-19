const express = require('express');
const Contenedor = require('../../contenedor');
const fs = require('fs');


let carrito = new Contenedor("Carrito");
let producto = new Contenedor("Productos");


const { Router } = express;
 
let router = new Router();


router.post('/', (req, res) => {
    carrito.save({"productos": [],"timestamp": Date.now()})
    .then(cart => carrito.getById(parseInt(cart)))
    .then(cart => res.send(cart));   
})


router.delete('/:id', (req, res) => {

    let id = parseInt(req.params.id);

    carrito.deleteById(id).then((resp)=>{

        if (resp){
            res.json(resp);
        }else{
            res.send(`El carrito con ID: ${id} no existe`);
        }
    })
}) 


router.get('/:id/productos', (req, res) => {

    let id = parseInt(req.params.id);

    carrito.getById(id).then((prod) => {
        prod.productos? res.send(prod.productos): res.send(`No existe el carrito con id: ${id}`);
    })
}) 


router.post('/:id/productos/:id_prod', (req, res) => {
    console.time('testTime');

    let id = parseInt(req.params.id);
    let id_prod = req.params.id_prod;

    producto.getById(parseInt(id_prod)).then((prod) => {

        if (!isNaN(id_prod) && (typeof prod) != "string" ){

            fs.readFile(`${carrito.name}.json`, 'utf-8', (error, contenido) => {
                read = JSON.parse(contenido);
    
                read[id-1].productos.push(prod);
    
                fs.writeFile(`${carrito.name}.json`, JSON.stringify(read,null,2), error => {
                    !error?  res.send(`Producto añadido al carrito`): res.send('Error en la escritura');
                });
            })

        }else{
            res.send(`El producto con ID: ${id_prod} no se encuentra`);
        }
        
    })

    console.timeEnd('testTime');
})


router.delete('/:id/productos/:id_prod', (req, res) => {

    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);

    fs.readFile(`${carrito.name}.json`, 'utf-8', (error, contenido) => {
        read = JSON.parse(contenido);
        prodCart = read[id-1].productos;

        let index = prodCart.findIndex(ind => ind.id == id_prod);

        if(index !== -1){
            prodCart.splice(index, 1);

            fs.writeFile(`${carrito.name}.json`, JSON.stringify(read, null, 2), error => {
                !error?  res.send(`Producto eliminado`): res.send('Error en el borrado');
            });


        }else{
            res.send(`No hay productos en el carrito con ID: ${id_prod}`);
        }

    })
}) 


module.exports = router; 