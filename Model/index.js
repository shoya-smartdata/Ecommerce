const sequelize = require('../config/db');


const User = require('./userModel');
const Product = require('./productModel');
const Category = require('./categoryModel');
const Cart = require('./cartModel');
const Order = require('./orderModel');

// Define Associations

// A User can have many Orders
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Cart);


Product.hasMany(Cart);
Cart.belongsTo(Product);
// A Category can have many Products
Category.hasMany(Product);
Product.belongsTo(Category);




// Export Models
module.exports = {
  User,
  Product,
  Category,
  Cart,
  Order,
  sequelize
};
