exports.authChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    if (req.url === "/auth/login" || req.url === "/auth/register") {
      res.redirect("/");
    }
    else{
      next();
    }
  } else {
    if (req.url === "/auth/login" || req.url === "/auth/register") {
      next()
    }
    else{
      res.redirect("/auth/login");
    }
  }
};
