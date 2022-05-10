// Handle logout destroy session and clear cookie.
module.exports = function (req, res, _next) {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
};
