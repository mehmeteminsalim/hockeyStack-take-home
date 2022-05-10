const Author = require("../../models/Author");
const async = require("async");
const Book = require("../../models/Book");

// Handle Author delete on POST.
module.exports = function (req, res, next) {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.body.authorid).exec(callback);
      },
      authors_books: function (callback) {
        Book.find({ author: req.body.authorid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // Success.
      if (results.authors_books.length > 0) {
        // Author has books. Render in same way as for GET route.
        res.render("author_delete", {
          title: "Delete Author",
          author: results.author,
          author_books: results.authors_books,
        });
      } else {
        // Author has no books. Delete object and redirect to the list of authors.
        Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
          if (err) {
            return next(err);
          }
          // Success - go to author list.
          res.redirect("/authors");
        });
      }
    }
  );
};
