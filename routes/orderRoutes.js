const express = require('express');
const authMiddleware = require('../Middleware/auth');
const { placeOrder, getOrderById, getAllOrders } = require('../Controller/orderController');

const orderRoute = express.Router();

orderRoute.post('/getapporder', authMiddleware, placeOrder );
orderRoute.get('/getorderbyid/:id', authMiddleware, getOrderById );
orderRoute.get('/getapporder', authMiddleware, getAllOrders );



module.exports = orderRoute;