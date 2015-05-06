'use strict';

angular.module('xstaticApp')
.controller( 'CatsCtrl', CatsCtrl);

function CatsCtrl( $scope, socket ) {

  $scope.onload = function() {
    socket.emit('get:catsandtags', 'please');
    socket.on('send:catsandtags', function(data){
      $scope.catsAndTags = data;
    });
  };

  $scope.generateSlug = function() {
    socket.emit('get:generateslug', $scope.thing.name);
    socket.on('send:generateslug', function(data){
      $scope.thing.slug = data;
    });
  };

  $scope.addOne = function() {
    if ($scope.thing) {
      if ($scope.thing.name) {
        socket.emit('post:catsandtags', $scope.thing);
        $scope.thing = {};
        $scope.thing.type=1;
      }
    }
  };

  $scope.removeTag = function(tagName) {
    socket.emit('delete:tag', tagName);
  };

  $scope.removeCat = function(catName) {
    socket.emit('delete:category', catName);
  };
}
