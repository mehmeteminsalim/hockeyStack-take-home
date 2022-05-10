// Display Author create form on GET.
module.exports = function (req, res, next) {
  res.render("author_form", { title: "Create Author" });
};
