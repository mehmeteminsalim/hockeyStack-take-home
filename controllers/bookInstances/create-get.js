const Book = require('../../models/Book');

// Display BookInstance create form on GET.
module.exports = function (req, res, next) {
  Book.find({}, 'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
    });
};