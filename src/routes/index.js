const express = require('express');
const router = express.Router();
//const routerProductos = require('../modules/products/productRoutes');
const routerUser = require('../modules/user/userRoutes');

router.use('/', routerUser);
//router.use('/productos', routerProductos);
//router.use('/user', routerUser);

module.exports = router;