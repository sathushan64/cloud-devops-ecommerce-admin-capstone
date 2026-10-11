const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.renderIndex);
router.get('/new', controller.renderNewForm);
router.post('/', controller.createProduct);
router.get('/:id/edit', controller.renderEditForm);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;