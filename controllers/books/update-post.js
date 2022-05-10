const Book = require('../../models/Book');

module.exports = function (req, res, next) {
  const filePath =
    req?.savedCoverImage === undefined
      ? "/uploads/defaultCover.png"
      : "/uploads/" + req.savedCoverImage;

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    cover_image: filePath,
    genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
    _id: req.params.id,
  });

  Book.findByIdAndUpdate(req.params.id, book, {}, function (err, bookRes) {
    if (err) return next(err);

    res.redirect(bookRes.url);
  });
};
