const { parallel } = require('async');

const Book = require('../../models/Book');
const BookInstance = require('../../models/BookInstance');

module.exports = function (req, res, next) {
  parallel({
    book: function (callback) {
      Book
        .findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    },
    bookInstances: function (callback) {
      BookInstance
        .find({ book: req.params.id })
        .exec(callback);
    }
  }, function (err, results) {
    if (err) return next(err);
    if (results.book === null) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }

    res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.bookInstances });
  });
};
