'use strict';

require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to db'));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
