const express = require('express');
const { Router } = express;
let router = new Router();
const { getProducts, addProduct, deleteProductById, updateProduct, getUpdateView, getProductsById } = require('./productController.js');

router.get('/', getProducts);
router.get('/:id', getProductsById);
router.get('/update/:id', getUpdateView);
router.post('/', addProduct);
router.delete('/:id', deleteProductById);
router.put('/:id', updateProduct)

module.exports = router;