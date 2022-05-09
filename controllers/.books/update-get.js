const { parallel } = require('async');

const Book = require('../../models/Book');
const Author = require('../../models/Author');
const Genre = require('../../models/Genre');

module.exports = function (req, res, next) {
  parallel({
    book: function (callback) {
      Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
    },
    authors: function (callback) {
      Author.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    }
  }, function (err, results) {
    if (err) return next(err);
    if (results.book == null) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }

    // Mark our selected genres as checked.
    for (let genreIter = 0; genreIter < results.genres.length; genreIter++) {
      for (let bookGenreIter = 0; bookGenreIter < results.book.genre.length; bookGenreIter++) {
        if (results.genres[genreIter]._id.toString() === results.book.genre[bookGenreIter]._id.toString()) {
          results.genres[genreIter].checked = 'true';
        }
      }
    }
    res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
  });
};
