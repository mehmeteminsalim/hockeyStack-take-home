const { parallel } = require("async");

const Book = require("../models/Book");
const BookInstance = require("../models/BookInstance");
const Author = require("../models/Author");
const Genre = require("../models/Genre");

// Display list of all Books.
exports.book_list = function (_req, res, next) {
  Book.find({}, "title author genre")
    .sort({ title: 1 })
    .populate("author genre")
    .exec(function (err, listBooks) {
      if (err) return next(err);

      res.render("book_list", { title: "Book List", book_list: listBooks });
    });
};

// Display detail page for a specific Book.
exports.book_detail = function (req, res, next) {
  parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      bookInstances: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book === null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }

      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        book_instances: results.bookInstances,
      });
    }
  );
};

// Display Book create form on GET.
exports.book_create_get = function (_req, res, next) {
  parallel(
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

      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

// Handle Book create on POST.
exports.book_create_post = function (req, res, next) {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
  });

  book.save(function (err) {
    if (err) return next(err);

    res.redirect(book.url);
  });
};

// Display Book delete form on GET.
exports.book_delete_get = function (req, res, next) {
  parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      bookInstances: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book == null) return res.redirect("/books");

      res.render("book_delete", {
        title: "Delete Book",
        book: results.book,
        book_instances: results.bookInstances,
      });
    }
  );
};

// Handle Book delete on POST.
exports.book_delete_post = function (req, res, next) {
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

      if (results.bookInstances.length > 0) {
        res.render("book_delete", {
          title: "Delete Book",
          book: results.book,
          book_instances: results.bookInstances,
        });
      } else {
        Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
          if (err) return next(err);

          res.redirect("/books");
        });
      }
    }
  );
};

// Display Book update form on GET.
exports.book_update_get = function (req, res, next) {
  parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book == null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }

      // Mark our selected genres as checked.
      for (let genreIter of results.genres) {
        for (let bookGenreIter of results.book.genre) {
          if (genreIter._id.toString() === bookGenreIter._id.toString()) {
            genreIter.checked = "true";
          }
        }
      }
      res.render("book_form", {
        title: "Update Book",
        authors: results.authors,
        genres: results.genres,
        book: results.book,
      });
    }
  );
};

// Handle Book update on POST.
exports.book_update_post = function (req, res, next) {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
    _id: req.params.id,
  });

  Book.findByIdAndUpdate(req.params.id, book, {}, function (err, bookRes) {
    if (err) return next(err);

    res.redirect(bookRes.url);
  });
};