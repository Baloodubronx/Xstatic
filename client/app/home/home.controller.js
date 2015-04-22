'use strict';

angular.module('xstaticApp')
.controller( 'HomeCtrl', HomeCtrl);

function HomeCtrl( $scope, socket ) {

  $scope.description = "A minimal template for angular";
  socket.on('message', function (message) {
    $scope.description = message;
    socket.emit('lapin', 'crétin');
  });
}
