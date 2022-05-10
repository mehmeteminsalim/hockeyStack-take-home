const Book = require('../../models/Book');

module.exports = function (req, res, next) {
  Book
    .find({}, 'title author genre')
    .sort({ title: 1 })
    .populate('author genre')
    .exec(function (err, listBooks) {
      if (err) return next(err);

      res.render('book_list', { title: 'Book List', book_list: listBooks });
    });
};
