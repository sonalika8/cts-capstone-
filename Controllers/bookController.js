const Book = require('../models/Book');

// GET /api/books?search=keyword
exports.getBooks = async (req, res) => {
  try {
    const search = req.query.search || '';
    const books = await Book.find({ title: { $regex: search, $options: 'i' } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/books
exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, createdBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || (book.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || (book.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};