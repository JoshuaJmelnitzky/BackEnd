const express = require('express');
const Contenedor = require('../../contenedor');

let producto = new Contenedor("productos");

const { Router } = express;
 
let router = new Router();


router.get('/:id?', (req, res) => {
    if (req.params.id){
        producto.getById(req.params.id)
            .then((resp) => {
                resp.length > 0? res.send(resp): res.send(`No existe el ID: ${req.params.id} ingresado`);
            });
    }else{
        producto.getAll(req.params.id)
            .then((resp) => res.send(resp));
    }
})


router.post('/', (req, res) => {

    producto.save(req.body)

    res.redirect('/');  
});


router.put('/:id', (req, res) => {

    producto.updateById(req.params.id, req.body)    
        .then(() => res.send("Producto actualizado"))
});


router.delete('/:id', (req, res) => {

    producto.deleteById(req.params.id)
        .then((resp) => res.send("Producto eliminado"))
});



module.exports = router; 
