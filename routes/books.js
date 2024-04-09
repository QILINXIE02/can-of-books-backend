const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Middleware for error handling
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

// Improved Get all books with error handling
router.get('/', asyncMiddleware(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
}));

// Improved Add a new book with validation and error handling
router.post('/', asyncMiddleware(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    // Assuming title and status are required
    return res.status(400).json({ message: 'Title and status are required' });
  }

  const book = new Book({
    title,
    description,
    status
  });

  const newBook = await book.save();
  res.status(201).json(newBook);
}));

// Improved Get a specific book by ID with error handling
router.get('/:id', asyncMiddleware(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(200).json(book);
}));

// Error handling middleware
router.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'An error occurred', error: error.message });
});

module.exports = router;
