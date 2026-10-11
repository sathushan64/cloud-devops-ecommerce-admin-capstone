const ProductModel = require('../models/productModel');

exports.renderIndex = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.render('index', { products });
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
};

exports.renderNewForm = (req, res) => {
  res.render('new');
};

exports.createProduct = async (req, res) => {
  try {
    await ProductModel.create(req.body);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error creating product: ' + err.message);
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const product = await ProductModel.getById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('edit', { product });
  } catch (err) {
    res.status(500).send('Error loading edit form: ' + err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await ProductModel.update(req.params.id, req.body);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error updating product: ' + err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ProductModel.delete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error deleting product: ' + err.message);
  }
};