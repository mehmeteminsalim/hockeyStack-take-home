const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.ObjectId, ref: 'Genre' }],
  cover_image: {
    type: String,
    default: "default_cover.jpg",
  },
});

BookSchema
  .virtual('url')
  .get(function () {
    return '/books/' + this._id;
  });

module.exports = mongoose.model('Book', BookSchema);
