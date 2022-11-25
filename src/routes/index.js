const express = require('express');
const router = express.Router();
const routesUser = require('../modules/user/userRoutes');
const routesProductos = require('../modules/products/productRoutes');
const routesInfo = require('../modules/info/infoRoutes');
const routesCarrito = require('../modules/cart/cartRoutes');
const routesOrders = require('../modules/orders/ordersRoutes');

router.use('/', routesUser);
router.use('/productos', routesProductos);
router.use('/info', routesInfo);
router.use('/carrito', routesCarrito);
router.use('/orders', routesOrders);

module.exports = router;