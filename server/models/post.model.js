'use strict';

var mongoose = require('mongoose');


var postSchema = mongoose.Schema({
  ID : {type : Number, default : 0},
  title : String,
  status : { type : String, default : 'unpublished'},
  type: {type : String, default : 'post'},
  author: {
    username : { type : String, default : 'admin' }
  },
  origin : {type : String, default : ''},
  content : {type : String, default : ''},
  date : {type: Date, default: Date.now},
  modified : {type : Date, default : Date.now},
  slug : {type : String, default : ''},
  excerpt : {type : String, default : ''},
  featured_image : {
    ID: Number
  },
  terms : {
    tag : [String],
    category : [ String ]
  }
});

// methods ======================

module.exports = mongoose.model('Post', postSchema);
