var Post = require('../models/post.model.js');
var Category = require('../models/category.model.js');
var Tag = require('../models/tag.model.js');
var Media = require('../models/media.model.js');
var getSlug = require('speakingurl');
var fs =require('fs');
var mkdirp = require('mkdirp');

// ROUTES for SOCKETS
exports.routes = function(socket) {

  // POST
  socket.on('get:posts', function(){sendPosts(socket);});
  socket.on('get:onepost', function(slug){sendOnePost(socket, slug);});
  socket.on('set:onepost', function(onepost){setOnePost(socket, onepost);});

  // CATEGORIES AND TAGS
  socket.on('get:catsandtags', function(){sendCatsAndTags(socket);});
  socket.on('post:catsandtags', function(thing){addCatsAndTags(socket, thing);});
  socket.on('delete:tag', function(tagName){removeTag(socket, tagName);});
  socket.on('delete:category', function(catName){removeCat(socket, catName);});

  // SLUG GENERATION
  socket.on('get:generateslug', function(thename){generateSlug(socket, thename);});

  // MEDIA
  socket.on('send:media', function(media){saveMedia(socket, media);});
  socket.on('get:media', function() {sendMedia(socket);});
};

function sendPosts(socket) {
  Post.find({}, {title:1, slug:1}, {sort:{modified:-1}}, function(err, posts){
    socket.emit('send:posts', posts );
  });
}

function sendOnePost(socket, slug) {
  Post.findOne({slug:slug}, function(err, post){
    socket.emit('send:onepost', post );
  });
}

function setOnePost(socket, onepost) {
  if (!onepost.title) {return 0;}
  if (onepost._id) {
    onepost.modified = Date.now();
    Post.findOneAndUpdate({_id: onepost._id}, onepost, {upsert:false}, function(err) {
      if (err)  {
        console.log(err);
        socket.emit('status:postsaved', {status:'error', error:err});
      }
      else {
        socket.emit('status:postsaved', {status:'ok'});
      }
    });
  } else {
    if (!onepost.slug) {
      onepost.slug = getSlug(onepost.title);
    }
    console.log(onepost);
    var newPost = new Post(onepost);
    newPost.save(function(err, post){
      if (err) {console.log(err);}
      socket.emit('status:postcreated', post.slug);
    });
  }

}

function sendCatsAndTags(socket) {
  var temp = {};
  Category.find({}, function(err, cats) {
    temp.cats = cats;
    Tag.find({}, function(err, tags) {
      temp.tags = tags;
      socket.emit('send:catsandtags', temp);
    });
  });
}

function addCatsAndTags(socket, thing) {

  if (!thing.slug) {
    thing.slug = getSlug(thing.name);
  }
  var temp = {};
  //1: Tag, 2: Category
  if (thing.type===1) {
    temp = new Tag(thing);
    temp.save(function(err) {
      if (err) {console.log(err);}
      sendCatsAndTags(socket);
    });
  }
  else {
    temp = new Category(thing);
    temp.save(function(err) {
      if (err) {console.log(err);}
      sendCatsAndTags(socket);
    });
  }
}

function removeTag(socket, tagName) {
  Tag.remove({name:tagName}, function(err) {
    if (err) {console.log(err);}
    sendCatsAndTags(socket);
  });
}

function removeCat(socket, catName) {
  Category.remove({name:catName}, function(err) {
    if (err) {console.log(err);}
    sendCatsAndTags(socket);
  });
}

function generateSlug(socket, thename) {
  socket.emit('send:generateslug', getSlug(thename));
}


function saveMedia(socket, media) {
  console.log(media.imageMeta);
  var base64Data = decodeBase64Image(media.imageData);
  var filetype = '';
  switch (base64Data.type) {
    case 'image/jpeg':
      filetype = '.jpg';
      break;
    case 'image/png':
      filetype = '.png';
      break;
    case 'image/tiff':
      filetype = '.tiff';
      break;
    default:
      break;
  }

  var d = new Date();
  var month = d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1;
  var dir = 'static/uploads/' + d.getFullYear() + '/' + month+'/';

  mkdirp(dir, function(){
    fs.writeFile(dir+media.imageMeta.slug+filetype, base64Data.data, function(err) {
      if (err) {console.log(err);}
      var temp = {};
      temp.title = media.imageMeta.title || 'No title set';
      temp.filename = media.imageMeta.slug + filetype;
      temp.description = media.imageMeta.desc || '';
      temp.path = 'uploads/' + d.getFullYear() + '/' + month+'/';

      var newMedia = new Media(temp);
      newMedia.save(function(err) {
        if (err) {console.log(err);}
        sendMedia(socket);
      });
    });
  });
}


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  if (matches.length !== 3) {
      return new Error('Invalid input string');
  }
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}

function sendMedia(socket) {
  Media.find({}, function(err, media){
    socket.emit('send:media', media );
  });
}
