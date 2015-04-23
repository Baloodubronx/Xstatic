'use strict';

angular.module('xstaticApp')
.controller( 'PostListCtrl', PostListCtrl)
.controller( 'PostEditCtrl', PostEditCtrl);

function PostListCtrl( $scope, socket ) {

  $scope.onload = function() {
    socket.emit('get:posts', 'youpi');
    socket.on('send:posts', function(data){
      $scope.posts = data;
    });
  };
}

function PostEditCtrl ( $scope, socket, $stateParams ) {
  $scope.onload = function() {
    socket.emit('get:onepost', $stateParams.slug);
    socket.on('send:onepost', function(data){
      $scope.post = data;
    });
  };
}
