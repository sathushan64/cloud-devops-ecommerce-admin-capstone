const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const ProductModel = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Health check endpoint (for monitoring/cloud)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Product Routes
app.use('/products', productRoutes);

// Auto-initialize DB and start server
ProductModel.initTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database table:', err);
  });