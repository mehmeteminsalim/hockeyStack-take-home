const { parallel } = require('async');

const Book = require('../models/Book');
const BookInstance = require('../models/BookInstance');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

module.exports = function (req, res, next) {
  parallel({
    book_count: function (callback) {
      Book.countDocuments({}, callback);
    },
    book_instance_count: function (callback) {
      BookInstance.countDocuments({}, callback);
    },
    book_instance_available_count: function (callback) {
      BookInstance.countDocuments({ status: 'Available' }, callback);
    },
    author_count: function (callback) {
      Author.countDocuments({}, callback);
    },
    genre_count: function (callback) {
      Genre.countDocuments({}, callback);
    }
  }, function (err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results });
  });
};
