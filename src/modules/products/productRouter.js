const express = require('express');
const {getAllProducts, addProduct} = require('./productController');

const { Router } = express;
 
let router = new Router();

// Ruta para obtener todos los productos.
router.get('/', getAllProducts);

// Ruta para agregar un producto.
router.post('/', addProduct);

module.exports = router; 
