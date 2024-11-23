// controllers/transactions.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

exports.getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db();
    const transactions = await db.collection('transactions').find().toArray();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const transactionId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const transaction = await db.collection('transactions').findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('transactions').insertOne(transaction);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Transaction created successfully', transactionId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating transaction' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const transactionId = new ObjectId(req.params.id);
  const updatedData = req.body;
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('transactions').replaceOne({ _id: transactionId }, updatedData);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Transaction updated successfully' });
    } else {
      res.status(404).json({ message: 'Transaction not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  const transactionId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('transactions').deleteOne({ _id: transactionId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};
