const User = require("../../models/User");
const { passwordToHash } = require("../../utils/helper");
const { body, validationResult } = require("express-validator");

// Handle login on POST.
module.exports = [
  // Validate and sanitize fields.
  body("email", "Please enter a valid email").trim().isEmail().normalizeEmail(),
  body("password", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  function (req, res, next) {
    let { email, password } = req.body;
    password = passwordToHash(password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("login", {
        errors: errors.array(),
      });
    } else {
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
    }
  },
];
