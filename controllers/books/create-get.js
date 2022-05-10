const { parallel } = require('async');

const Author = require('../../models/Author');
const Genre = require('../../models/Genre');

module.exports = function (req, res, next) {
  parallel({
    authors: function (callback) {
      Author.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    }
  }, function (err, results) {
    if (err) return next(err);

    res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
  });
};
