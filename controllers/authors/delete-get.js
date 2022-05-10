const Author = require("../../models/Author");
const async = require("async");
const Book = require("../../models/Book");

// Display Author delete form on GET.
module.exports = function (req, res, next) {
    async.parallel(
      {
        author: function (callback) {
          Author.findById(req.params.id).exec(callback);
        },
        authors_books: function (callback) {
          Book.find({ author: req.params.id }).exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.author == null) {
          // No results.
          res.redirect("/authors");
        }
        // Successful, so render.
        res.render("author_delete", {
          title: "Delete Author",
          author: results.author,
          author_books: results.authors_books,
        });
      }
    );
  };