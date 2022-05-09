const mongoose = require('mongoose');
const { DateTime } = require('luxon'); // for date handling

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name;
});

AuthorSchema.virtual('url').get(function () {
  return '/authors/' + this._id;
});

AuthorSchema.virtual('lifespan').get(function () {
  let lifetimeString = '';
  if (this.date_of_birth) {
    lifetimeString = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetimeString += ' - ';
  if (this.date_of_death) {
    lifetimeString += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return lifetimeString;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model('Author', AuthorSchema);
