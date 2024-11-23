// controllers/products.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

exports.getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db();
    const products = await db.collection('products').find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const product = await db.collection('products').findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = req.body;
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('products').insertOne(product);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Product created successfully', productId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating product' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const updatedData = req.body;
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('products').replaceOne({ _id: productId }, updatedData);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection('products').deleteOne({ _id: productId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
