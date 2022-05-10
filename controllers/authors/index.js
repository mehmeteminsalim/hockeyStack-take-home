const Author = require("../../models/Author");
const async = require("async");
const Book = require("../../models/Book");

// Display detail page for a specific Author.
module.exports = function (req, res, next) {
    async.parallel(
      {
        author: function (callback) {
          Author.findById(req.params.id).exec(callback);
        },
        authors_books: function (callback) {
          Book.find({ author: req.params.id }, "title summary").exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        } // Error in API usage.
        if (results.author == null) {
          // No results.
          var err = new Error("Author not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.render("author_detail", {
          title: "Author Detail",
          author: results.author,
          author_books: results.authors_books,
        });
      }
    );
  };