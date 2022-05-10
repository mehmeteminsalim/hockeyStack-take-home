const Genre = require('../../models/Genre');

// Display list of all Genre.
module.exports = function (req, res, next) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('genre_list', { title: 'Genre List', list_genres: list_genres });
    });
};