const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['To Read', 'Reading', 'Finished'],
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
