'use strict';

angular.module('xstaticApp')
.controller( 'MediaCtrl', MediaCtrl);

function MediaCtrl( $scope, socket ) {
  $scope.onefile = null;
  $scope.imgsrc = '';
  $scope.media = {slug:'', title:'', desc:''};

  socket.on('status:mediasaved', function(status) {
    console.log('media saved');
    console.log(status);
  });

  socket.on('send:media', function(media){
    $scope.mediaList = media;
  });

  $scope.load = function() {
    socket.emit('get:media', 'please');
  };

  $scope.setFile = function(something) {
    console.log(something.result);
    $scope.$apply(function() {
      $scope.onefile = something.files[0];
      $scope.media.slug = something.files[0].name;
      var reader = new FileReader();
      reader.onload = function(evt){
        $scope.$apply(function() {
          $scope.imgsrc = evt.target.result;
        });
      };
      reader.readAsDataURL($scope.onefile);
    });
  };

  $scope.sendFile = function() {
    $scope.imgobj = {
        'imageData': $scope.imgsrc,
        'imageMeta': $scope.media
    };

    if ($scope.imgsrc) {
      socket.emit('send:media', $scope.imgobj);
    }
  };
}
