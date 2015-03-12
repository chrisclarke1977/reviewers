var mongoose = require('mongoose');

var trackerSchema = new mongoose.Schema({
  ref: String,
  email: String,
  time : { type : Date, default: Date.now },
  arrived: { type: Boolean },
  problems: String
});

module.exports = mongoose.model('tracker', trackerSchema);
