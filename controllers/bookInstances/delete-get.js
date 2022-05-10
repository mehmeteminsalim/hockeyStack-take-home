const BookInstance = require("../../models/BookInstance");

// Display BookInstance delete form on GET.
module.exports = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        // No results.
        res.redirect("/bookinstances");
      }
      // Successful, so render.
      res.render("bookinstance_delete", {
        title: "Delete BookInstance",
        bookinstance: bookinstance,
      });
    });
};
