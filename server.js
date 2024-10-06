const express = require("express")
const app = express();
require('dotenv').config()
const sequelize = require('./config/db');
const userRoute = require('./routes/userRoutes')
const { User, Product, Category, Cart, Order } = require('./Model/index');
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoutes");


app.use(express.json());



app.use('/api', userRoute);
app.use('/api',productRoute );
app.use('/api', cartRoutes);
app.use('/api', orderRoute)

sequelize.sync({ alter: true })  // This drops and recreates all tables (use in dev only)
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is running successfully ${PORT}`);
    
})