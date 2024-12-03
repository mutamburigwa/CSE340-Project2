const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions'); // Correct path
const isAuthenticated = require('../middleware/authenticate'); // Authentication middleware

// Get all transactions - Authentication not required
router.get('/', transactionsController.getAll);

// Get a transaction by ID - Authentication not required
router.get('/:id', transactionsController.getSingle);

// Create a new transaction - Authentication required
router.post('/', isAuthenticated, transactionsController.createTransaction);

// Update a transaction by ID - Authentication required
router.put('/:id', isAuthenticated, transactionsController.updateTransaction);

// Delete a transaction by ID - Authentication required
router.delete('/:id', isAuthenticated, transactionsController.deleteTransaction);

module.exports = router;
