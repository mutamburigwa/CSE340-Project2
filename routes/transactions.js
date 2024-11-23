const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions'); // Correct path

// Get all transactions
router.get('/', transactionsController.getAll);

// Get a transaction by ID
router.get('/:id', transactionsController.getSingle);

// Create a new transaction
router.post('/', transactionsController.createTransaction);

// Update a transaction by ID
router.put('/:id', transactionsController.updateTransaction);

// Delete a transaction by ID
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
