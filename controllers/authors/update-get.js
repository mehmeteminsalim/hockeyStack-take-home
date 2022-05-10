// Display Author update form on GET.
module.exports = function (req, res, next) {
  Author.findById(req.params.id, function (err, author) {
    if (err) {
      return next(err);
    }
    if (author == null) {
      // No results.
      var err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render("author_form", { title: "Update Author", author: author });
  });
};
