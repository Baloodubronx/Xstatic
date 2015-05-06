'use strict';

var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name : { type : String, unique : true },
  slug : String,
  description : String
});

// methods ======================

module.exports = mongoose.model('Category', categorySchema);
