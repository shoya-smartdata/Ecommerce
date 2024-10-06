const { Order, Cart, Product } = require('../models');

// Place an order
exports.placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });

    const order = await Order.create({
      userId: req.user.id,
      products: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product.price
      })),
      totalPrice: cartItems.reduce((acc, item) => acc + (item.quantity * item.Product.price), 0),
      status: 'pending'
    });

    // Clear cart after placing order
    await Cart.destroy({ where: { userId: req.user.id } });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, { include: Product });
    if (!order || order.userId !== req.user.id) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

