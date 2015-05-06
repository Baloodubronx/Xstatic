'use strict';

var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
  name : { type : String, unique : true },
  slug : String,
  description : String
});

// methods ======================

module.exports = mongoose.model('Tag', tagSchema);
