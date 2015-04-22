var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection', function(socket){
  socket.emit('message', 'Yaouhhhh');

  socket.on('lapin', function(data){
  });
  socket.on('message', function(message) {
    console.log(message);
  });
});


app.use('/client', express.static('client/'));

app.use(express.static('static/'));


http.listen(3000, function(){
  console.log('Listening on port 3000');
});
