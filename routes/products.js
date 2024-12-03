const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const isAuthenticated = require('../middleware/authenticate');

// Get all products (no authentication needed)
router.get('/', productsController.getAll);

// Get a product by ID (no authentication needed)
router.get('/:id', productsController.getSingle);

// Create a new product (authentication required)
router.post('/', isAuthenticated, productsController.createProduct);

// Update a product by ID (authentication required)
router.put('/:id', isAuthenticated, productsController.updateProduct);

// Delete a product by ID (authentication required)
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
