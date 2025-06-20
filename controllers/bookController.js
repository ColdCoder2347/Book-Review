const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};
