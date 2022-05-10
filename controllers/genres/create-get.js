// Display Genre create form on GET.
module.exports = function (req, res, next) {
  res.render('genre_form', { title: 'Create Genre' });
};
