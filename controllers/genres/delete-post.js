const Genre = require("../../models/Genre");
const Book = require("../../models/Book");
const async = require("async");

// Handle Genre delete on POST.
module.exports = function (req, res, next) {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // Success
      if (results.genre_books.length > 0) {
        // Genre has books. Render in same way as for GET route.
        res.render("genre_delete", {
          title: "Delete Genre",
          genre: results.genre,
          genre_books: results.genre_books,
        });
      } else {
        // Genre has no books. Delete object and redirect to the list of genres.
        Genre.findByIdAndRemove(req.body.id, function deleteGenre(err) {
          if (err) {
            return next(err);
          }
          // Success - go to genres list.
          res.redirect("/genres");
        });
      }
    }
  );
};
