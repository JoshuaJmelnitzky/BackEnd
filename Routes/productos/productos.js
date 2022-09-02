const express = require('express');
require('dotenv').config();
const Contenedor = require('../../contenedor');
const Producto = require('../../models/products');
let producto = new Contenedor("productos");

const { Router } = express;
 
let router = new Router();


router.get('/', async (req, res) => { 

    const allproducts = await Producto.find().lean();
    if (allproducts.length > 0){
        res.render("productos", {data: allproducts});
    }else{
        res.render("productosEmpty");
    }
    
})


router.post('/', (req, res) => {

    const addProduct = new Producto(req.body)
    addProduct.save();

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
