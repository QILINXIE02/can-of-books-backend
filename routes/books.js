// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Assuming you have a Book model

// Existing routes for GET, POST, and DELETE

// PUT route for updating a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with the request body
      { new: true } // Return the updated book
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
});

module.exports = router;
