// Display list of all Authors.
module.exports = function (req, res, next) {
    Author.find()
      .sort([['family_name', 'ascending']])
      .exec(function (err, list_authors) {
        if (err) { return next(err); }
        // Successful, so render.
        res.render('author_list', { title: 'Author List', author_list: list_authors });
      });
  };