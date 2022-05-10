const { parallel } = require('async');
const path = require("path");
const fs = require('fs');

const Book = require('../../models/Book');
const BookInstance = require('../../models/BookInstance');

module.exports = function (req, res, next) {
  parallel(
    {
      book: function (callback) {
        Book.findById(req.body.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      bookInstances: function (callback) {
        BookInstance.find({ book: req.body.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);

      let deletePath = path.join(
        __dirname,
        "../../",
        "public",
        results.book.cover_image
      );

      if (results.bookInstances.length > 0) {
        res.render("book_delete", {
          title: "Delete Book",
          book: results.book,
          book_instances: results.bookInstances,
        });
      } else {
        fs.stat(deletePath, function (err, stats) {
          if (err) {
            return next(new Error(err));
          }
          if (results.book.cover_image !== "/uploads/defaultCover.png") {
            fs.unlink(deletePath, function (err) {
              if (err) return next(err);
              Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
                if (err) return next(err);
                res.redirect("/books");
              });
            });
          } else {
            Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
              if (err) return next(err);
              res.redirect("/books");
            });
          }
        });
      }
    }
  );
};
