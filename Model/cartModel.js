const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Include any other fields needed
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Ensure this matches your User model's table name
      key: 'id'
    }
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // Ensure this matches your Product model's table name
      key: 'id'
    }
  }
});

module.exports = Cart;
