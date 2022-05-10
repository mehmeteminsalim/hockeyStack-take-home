const Genre = require("../../models/Genre");

// Display Genre update form on GET.
module.exports = function (req, res, next) {
  Genre.findById(req.params.id, function (err, genre) {
    if (err) {
      return next(err);
    }
    if (genre == null) {
      // No results.
      var err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render("genre_form", { title: "Update Genre", genre: genre });
  });
};
