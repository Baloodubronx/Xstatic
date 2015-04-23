'use strict';

var mongoose = require('mongoose');

// define the schema for our user model
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
    post_tag : [{
      name : String,
      slug : String,
      description : String
    }],
    category : [{
      name : String,
      slug : String,
      description : String
    }]
  }
});

// methods ======================

module.exports = mongoose.model('Post', postSchema);
