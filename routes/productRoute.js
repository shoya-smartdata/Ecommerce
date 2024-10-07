const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../Controller/productController');
const authMiddleware = require('../Middleware/auth');

const productRoute = express.Router();

productRoute.get('/',getProducts);
productRoute.get('/getapp/:id', getProductById )


productRoute.post('/createproduct',authMiddleware, createProduct);
productRoute.put('/update/:id', authMiddleware, updateProduct)
productRoute.delete('/delete/:id', authMiddleware, deleteProduct)




module.exports = productRoute;