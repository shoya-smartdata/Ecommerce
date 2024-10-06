const express = require("express");
const { addToCart, getCart, updateCartItem, removeFromCart } = require("../Controller/cartController");
const authMiddleware = require("../Middleware/auth");

const cartRoutes = express.Router();

cartRoutes.get('/getcartdata', authMiddleware, getCart)

cartRoutes.post('/addtocart', authMiddleware, addToCart );
cartRoutes.put('/update', authMiddleware, updateCartItem)
cartRoutes.delete('/remove', authMiddleware, removeFromCart)



module.exports = cartRoutes;