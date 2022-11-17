const express = require('express');
const { Router } = express;
const router = new Router();
const { getOrders, getOrderById, deleteOrderById } = require('./ordersController');

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrderById);

module.exports = router;