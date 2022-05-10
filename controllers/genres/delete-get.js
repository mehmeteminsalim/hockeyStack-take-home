const Genre = require('../../models/Genre');
const Book = require('../../models/Book');
const async = require('async');

// Display Genre delete form on GET.
module.exports = function (req, res, next) {
  async.parallel({
    genre: function (callback) {
      Genre.findById(req.params.id).exec(callback);
    },
    genre_books: function (callback) {
      Book.find({ genre: req.params.id }).exec(callback);
    }
  }, function (err, results) {
    if (err) { return next(err); }
    if (results.genre == null) { // No results.
      res.redirect('/genres');
    }
    // Successful, so render.
    res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books });
  });
};