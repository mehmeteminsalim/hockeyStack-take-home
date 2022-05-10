// Display login form on GET.
module.exports = function (req, res, next) {
  res.render("login", { title: "Login" });
};
