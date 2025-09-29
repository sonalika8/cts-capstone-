const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../Controllers/bookController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public: Search or list books
router.get('/', getBooks);

// Protected: Add a new book
router.post('/', protect, addBook);

// Protected: Update a book
router.put('/:id', protect, updateBook);

// Protected: Delete a book
router.delete('/:id', protect, deleteBook);

module.exports = router;