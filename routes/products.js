const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products'); // Correct path

// Get all products
router.get('/', productsController.getAll);

// Get a product by ID
router.get('/:id', productsController.getSingle);

// Create a new product
router.post('/', productsController.createProduct);

// Update a product by ID
router.put('/:id', productsController.updateProduct);

// Delete a product by ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
