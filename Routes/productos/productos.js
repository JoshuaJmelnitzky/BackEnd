const express = require('express');
const Producto = require('../../models/products');

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





module.exports = router; 
