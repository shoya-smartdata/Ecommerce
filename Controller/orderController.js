const  Cart = require('../Model/cartModel');
const Order = require('../Model/orderModel');
const Product = require('../Model/productModel')

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

//admin 



const checkAdmin = (user) =>{ 
  return user && user.role === "admin";
}

exports.getAllOrders = async (req, res) => {

  
  if (!checkAdmin(req.user)) {
    return res.status(403).json({ error: ' only  admin can see all orders  !' });
}
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

