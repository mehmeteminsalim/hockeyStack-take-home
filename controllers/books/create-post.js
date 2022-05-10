const Book = require("../../models/Book");

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
    genre: req.body.genre,
    cover_image: filePath,
  });

  book.save(function (err) {
    if (err) return next(err);

    res.redirect(book.url);
  });
};
