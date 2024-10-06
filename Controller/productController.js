const  Product  = require('../Model/productModel');
const Category = require('../Model/categoryModel')

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  const { name, price, description, quantity, categoryId, imageUrl } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      quantity,
      imageUrl,
      CategoryId: categoryId
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, categoryId, imageUrl } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update({
      name,
      price,
      description,
      quantity,
      imageUrl,
      CategoryId: categoryId
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


