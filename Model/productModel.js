const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name:
        { type: DataTypes.STRING,
         allowNull: false 
        },
  price: 
        { type: DataTypes.FLOAT,
        allowNull: false 
        },
  description: 
        {
        type: DataTypes.STRING 
        },
  quantity:
        {
        type: DataTypes.INTEGER,
        allowNull: false 
        },
  imageUrl: 
        {
        type: DataTypes.STRING 
        },
});

module.exports = Product;
