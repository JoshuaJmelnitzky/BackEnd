const express = require('express');
let { Router } = express;
const router = new Router();

const { obtenerInfo } = require('./infoController');

router.get('/', obtenerInfo);

module.exports = router;