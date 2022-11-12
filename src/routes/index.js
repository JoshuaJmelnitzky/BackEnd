const express = require('express');
const router = express.Router();
const routesUser = require('../modules/user/userRoutes');
const routesProductos = require('../modules/products/productRoutes');
const routesInfo = require('../modules/info/infoRoutes');
const routesCarrito = require('../modules/cart/cartRoutes');

router.use('/user', routesUser);
router.use('/productos', routesProductos);
router.use('/info', routesInfo);
router.use('/carrito', routesCarrito);

module.exports = router;