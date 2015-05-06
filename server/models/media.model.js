'use strict';

var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
  title: String,
  filename : String,
  path : String,
  date : {type : Date, default : Date.now},
  description : String
});

// methods ======================

module.exports = mongoose.model('Media', mediaSchema);
