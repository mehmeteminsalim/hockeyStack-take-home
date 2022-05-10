const User = require("../../models/User");
const { passwordToHash } = require("../../utils/helper");
const { body, validationResult } = require("express-validator");

// Handle register on POST.
module.exports = [
  // Validate and sanitize fields.
  body("email", "Please enter a valid email").trim().isEmail().normalizeEmail(),
  body("password", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    const user = new User({
      email: req.body.email,
      password: passwordToHash(req.body.password),
    });

    if (!errors.isEmpty()) {
      res.render("register", {
        errors: errors.array(),
      });
    } else {
      user.save(function (err) {
        if (err) return next(err);
        res.redirect("/auth/login");
      });
    }
  },
];
