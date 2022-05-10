const Author = require("../../models/Author");
const { body, validationResult } = require("express-validator");

// Handle Author update on POST.
module.exports = [
  // Validate and santize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data (and the old id!)
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("author_form", {
        title: "Update Author",
        author: author,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Update the record.
      Author.findByIdAndUpdate(
        req.params.id,
        author,
        {},
        function (err, theauthor) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to genre detail page.
          res.redirect(theauthor.url);
        }
      );
    }
  },
];
