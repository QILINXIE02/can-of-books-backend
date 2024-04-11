'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to the database'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Test route
app.get('/test', (req, res) => {
  res.send('Test route accessed successfully');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
