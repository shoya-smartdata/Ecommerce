const  Product  = require('../Model/productModel');
const Category = require('../Model/categoryModel')

// all products 
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// one product 
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'product  not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create product 

const checkAdmin = (user) => {
  return user && user.role === 'admin';
}

exports.createProduct = async (req, res) => {
 
  if (!checkAdmin(req.user)) {
    return res.status(403).json({ error: ' only  admin can add new products !' });
}
  try {
    const { name, price, description, quantity, categoryId, imageUrl } = req.body;
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

// Update product 
exports.updateProduct = async (req, res) => {
  if (!checkAdmin(req.user)) {
    return res.status(403).json({ error: ' only  admin can updt new products !' });
}
 

  try {
    const { id } = req.params;
    const { name, price, description, quantity, categoryId, imageUrl } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'product not found ' });

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

// Delete prdt
exports.deleteProduct = async (req, res) => {
  if (!checkAdmin(req.user)) {
    return res.status(403).json({ error: ' only  admin can updt new products !' });
}
 

  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'product not found' });

    await product.destroy();
    res.json({ message: 'deleted !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


