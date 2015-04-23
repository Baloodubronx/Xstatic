var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config/config');
var mongoose = require('mongoose');
var xapi = require('./api/xapi.js');

mongoose.connect(config.db);

io.on('connection', function(socket){

  xapi.routes(socket);

});

app.use('/client', express.static('client/'));

app.use(express.static('static/'));


http.listen(3000, function(){
  console.log('Listening on port 3000');
});
