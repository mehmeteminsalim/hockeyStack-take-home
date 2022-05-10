const async = require("async");
const Author = require("../../models/Author");
const Book = require("../../models/Book");
const Genre = require("../../models/Genre");

// Display list of all books with a filter
module.exports = function (req, res, next) {
  async.parallel(
    {
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      var titleRegexp = new RegExp(req.body.title);

      let query =
        req.body.author == "all"
          ? {}
          : {
              author: req.body.author,
            };

      Book.find(
        { title: titleRegexp, ...query },
        "title author genre cover_image summary"
      )
        .sort({ title: 1 })
        .populate("author genre")
        .exec(function (err, listBooks) {
          if (err) return next(err);

          res.render("book_list", {
            title: "Book List",
            book_list: listBooks,
            authors: results.authors,
            genres: results.genres,
          });
        });
    }
  );
};
