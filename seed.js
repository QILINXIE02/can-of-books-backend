require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    const books = [
      {
        title: 'Book 1',
        description: 'Book 1 description',
        status: 'To Read'
      },
      {
        title: 'Book 2',
        description: 'Book 2 description',
        status: 'Reading'
      },
      {
        title: 'Book 3',
        description: 'Book 3 description',
        status: 'Finished'
      }
    ];

    await Book.insertMany(books);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1); // Exit with failure status
  }
}

seed();
