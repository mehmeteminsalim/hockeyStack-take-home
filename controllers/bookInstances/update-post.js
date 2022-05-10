const BookInstance = require('../../models/BookInstance');
const Book = require('../../models/Book');


const { body, validationResult } = require('express-validator');

// Handle BookInstance update on POST.
module.exports = [

  // Validate and sanitize fields.
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped/trimmed data and current id.
    const bookinstance = new BookInstance(
      {
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
        _id: req.params.id
      });

    if (!errors.isEmpty()) {
      // There are errors so render the form again, passing sanitized values and errors.
      Book.find({}, 'title')
        .exec(function (err, books) {
          if (err) { return next(err); }
          // Successful, so render.
          res.render('bookinstance_form', { title: 'Update BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
        });
    } else {
      // Data from form is valid.
      BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err, thebookinstance) {
        if (err) { return next(err); }
        // Successful - redirect to detail page.
        res.redirect(thebookinstance.url);
      });
    }
  }
];
