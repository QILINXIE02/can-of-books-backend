const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Middleware for streamlined async error handling
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.json(books);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ message: 'Title and status are required.' });
  }
  const newBook = await Book.create({ title, description, status });
  res.status(201).json(newBook);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  res.json(book);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  if (!deletedBook) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  res.json({ message: 'Book deleted successfully.' });
}));

// Global error handler
router.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
});

module.exports = router;
