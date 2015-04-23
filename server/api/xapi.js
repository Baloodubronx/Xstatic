var Post = require('../models/post.model.js');

exports.routes = function(socket) {
  socket.on('get:posts', function(){sendPosts(socket);});
  socket.on('get:onepost', function(slug){sendOnePost(socket, slug);});
};

function sendPosts(socket) {
  Post.find({}, {title:1, slug:1}, function(err, posts){
    socket.emit('send:posts', posts );
  });
}

function sendOnePost(socket, slug) {
  Post.findOne({slug:slug}, function(err, post){
    socket.emit('send:onepost', post );
  });
}
