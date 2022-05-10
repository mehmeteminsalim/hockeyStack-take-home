const Book = require('../../models/Book');

module.exports = function (req, res, next) {
  const book = new Book(
    {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    });

  book.save(function (err) {
    if (err) return next(err);

    res.redirect(book.url);
  });
};
