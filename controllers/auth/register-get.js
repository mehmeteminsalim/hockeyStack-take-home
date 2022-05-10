// Handle register on GET.
module.exports = function (req, res, next) {
  res.render("register", { title: "Register" });
};
