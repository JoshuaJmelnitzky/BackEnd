const router = require('express').Router();
const { getCartById, addProductToCart, deleteProductFromCart, checkout } = require('./cartController');

//Al finalizar la compra 
// router.post('/compra', checkout);

//Para listar todos los productos de un carrito según su id
router.get('/:id', getCartById);

//Para agregar un producto al carrito por id del producto
router.post('/:id', addProductToCart);

//Para eliminar del carrito un producto por su id
router.delete('/:id', deleteProductFromCart);

module.exports = router;