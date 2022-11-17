const router = require('express').Router();
const { getCartById, addProductToCart, deleteProductFromCart, checkout } = require('./cartController');


router.post('/checkout', checkout);
router.get('/:id', getCartById);
router.post('/:id', addProductToCart);
router.delete('/:id', deleteProductFromCart);

module.exports = router;