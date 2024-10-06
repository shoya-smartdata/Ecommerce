const express = require('express');
const  {signup, login}  = require('../Controller/userController');

const userRoute = express.Router();


userRoute.post('/signup', signup)

userRoute.post('/login',  login)

module.exports = userRoute;