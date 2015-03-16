var mongoose = require('mongoose');

var  shipSchema = new mongoose.Schema({
  ref: String,
  products: String,
  time: { type : Date, default: Date.now },
  user: { type: Boolean },
  company: String,
  posttracker: String,
  email: { type: Boolean }
});

module.exports = mongoose.model(' ship',  shipSchema);