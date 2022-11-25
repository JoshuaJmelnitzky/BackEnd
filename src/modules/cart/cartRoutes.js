const router = require('express').Router();
const { getCartById, addProductToCart, deleteProductFromCart, checkout } = require('./cartController');
const { requiereAutenticacion } = require('../../middlewares/middlewares'); 

router.post('/checkout', requiereAutenticacion, checkout);
router.get('/:id', requiereAutenticacion, getCartById);
router.post('/:id', requiereAutenticacion, addProductToCart);
router.delete('/:id', requiereAutenticacion, deleteProductFromCart);

module.exports = router;