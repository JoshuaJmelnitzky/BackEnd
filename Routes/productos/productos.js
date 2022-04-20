const express = require('express');
const Contenedor = require('../../contenedor');

let producto = new Contenedor("Productos");

const { Router } = express;
 
let router = new Router();

router.get('/productos', (req, res) => {
    producto.getAll().then(prod =>res.send(prod));
})


router.get('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    producto.getById(id).then(prod => res.send(prod));
})


router.post('/productos', (req, res) => {

    let {title, price, thumbnail} = req.body;

    producto.save({title, price, thumbnail})
        .then(prod => producto.getById(parseInt(prod)))
        .then(prod => res.send(prod));   
})


router.put('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    producto.getById(id).then((prod)=>{

        let {title, price, thumbnail} = req.body;

        let actulizacion = {title, price, thumbnail, id} ;

        res.send({Producto:prod, Cambio:actulizacion})
    });
}) 


router.delete('/productos/:id', (req, res) => {

    let id = parseInt(req.params.id);
    producto.deleteById(id).then((resp)=>{
        if (resp){
            res.json(resp);
        }else{
            res.send(`El producto con ID: ${id} no existe`);
        }
    })
}) 



module.exports = router; 
