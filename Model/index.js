const sequelize = require('../config/db');


const User = require('./userModel');
const Product = require('./productModel');
const Category = require('./categoryModel');
const Cart = require('./cartModel');
const Order = require('./orderModel');

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Cart);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);


module.exports = {
  User,
  Product,
  Category,
  Cart,
  Order,
  sequelize
};
