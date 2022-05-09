const User = require("../models/User");
const { passwordToHash } = require("../utils/helper");
const { body, validationResult } = require("express-validator");

// Display login form on GET.
exports.auth_login_get = function (req, res, next) {
  res.render("login", { title: "Login" });
};

// Handle login on POST.
exports.auth_login_post = [

  // Validate and sanitize fields.
  body("email", "Please enter a valid email").trim().isEmail().normalizeEmail(),
  body("password", "Please enter a password").trim().isLength({ min: 6 }).escape(),

  function (req, res, next) {
    let { email, password } = req.body;
    password = passwordToHash(password);

    const errors = validationResult(req);

    User.findOne({ email, password })
      .select("+password")
      .exec(function (err, user) {
        if (err) next(err);
        if (!user && password !== user.password) {
          res.redirect("/auth/login");
        }
        if (password === user.password) {
          req.session.user = user;
          res.redirect("/");
        }
      });
  },
];

exports.auth_register_get = function (req, res, next) {
  res.render("register" , { title: "Register" });
};

exports.auth_register_post = function (req, res, next) {
  const user = new User({
    email: req.body.email,
    password: passwordToHash(req.body.password),
  });

  user.save(function (err) {
    if (err) return next(err);
    res.redirect("/auth/login");
  });
};

exports.auth_logout = function (req, res, _next) {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
};
