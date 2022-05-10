const BookInstance = require("../../models/BookInstance");

// Handle BookInstance delete on POST.
module.exports = function (req, res, next) {
  // Assume valid BookInstance id in field.
  BookInstance.findByIdAndRemove(req.body.id, function deleteBookInstance(err) {
    if (err) {
      return next(err);
    }
    // Success, so redirect to list of BookInstance items.
    res.redirect("/bookinstances");
  });
};
