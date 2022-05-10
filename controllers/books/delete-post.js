const { parallel } = require('async');

const Book = require('../../models/Book');
const BookInstance = require('../../models/BookInstance');

module.exports = function (req, res, next) {
  parallel({
    book: function (callback) {
      Book
        .findById(req.body.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    },
    bookInstances: function (callback) {
      BookInstance
        .find({ book: req.body.id })
        .exec(callback);
    }
  }, function (err, results) {
    if (err) return next(err);

    if (results.bookInstances.length > 0) {
      res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.bookInstances });
    } else {
      Book
        .findByIdAndRemove(req.body.id, function deleteBook (err) {
          if (err) return next(err);

          res.redirect('/books');
        });
    }
  });
};
