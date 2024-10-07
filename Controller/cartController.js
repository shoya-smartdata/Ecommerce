const Cart  = require('../Model/cartModel');
const Product = require("../Model/productModel")

//add to cart 
exports.addToCart = async (req, res) => {
    
  try {

    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'product not found' });

    const cartItem = await Cart.create({
      UserId: userId,
      ProductId: productId,
      quantity : quantity
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// by id
exports.getCart = async (req, res) => {
  try {
    console.log('User ID:', req.user.id); 
    const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// update 
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

// Remove item 
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cartItem = await Cart.findOne({ where: { userId: req.user.id, productId } });
    if (!cartItem) return res.status(404).json({ message: 'No cart item ' });

    await cartItem.destroy();
    res.json({ message: 'Item removed successfully from cart !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// update line 24  