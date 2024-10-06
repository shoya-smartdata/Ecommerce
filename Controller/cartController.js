const Cart  = require('../Model/cartModel');
const Product = require("../Model/productModel")

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    console.log('User ID:', req.user.id); // Check the user ID
    const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update cart item
exports.updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findOne({ where: { userId: req.user.id, productId } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    await cartItem.update({ quantity });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cartItem = await Cart.findOne({ where: { userId: req.user.id, productId } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


