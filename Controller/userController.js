
const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup 
exports.signup = async (req, res) => {
    try {
      const { username, email, role, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await User.create({
        username,
        email,
        role,
        password: hashedPassword,
      });
      
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ message: 'Error registering user', error });
    }
  };


//   Login  controller !
  exports.login = async  (req, res) => {
   
  
    try {
        const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });
 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

