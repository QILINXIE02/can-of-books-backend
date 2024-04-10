// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Existing GET and POST routes

// Update a book
router.put('/book/:id', async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ message: 'Title and status are required fields.' });
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status
    }, { new: true });

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Existing DELETE route

module.exports = router;
