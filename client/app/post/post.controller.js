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

function PostEditCtrl ( $scope, socket, $stateParams, $state ) {
  $scope.modified = false;
  $scope.post = {
    title:'The post title',
    content : 'The post content',
    terms: {
      tag: [],
      category : []
    }};

  // SOCKET CALLBACKS
  socket.on('send:onepost', function(data){
    $scope.status="post received";
    $scope.post = data;
    $scope.modified = false;
  });

  socket.on('status:postsaved', function(data) {
    $scope.status = 'post saved successfully';
    $state.go('post.edit', {slug:$scope.post.slug});
  });

  socket.on('status:postcreated', function(slug) {
    $state.go('post.edit', {slug:slug});
  });

  socket.on('send:catsandtags', function(data){
    $scope.catsAndTags = data;
    $scope.currentTag = data.tags[0].name;
    $scope.currentCat = data.cats[0].name;
  });

  socket.on('send:generateslug', function(data) {
    $scope.post.slug = data;
  });
  // END SOCKET CALLBACKS

  $scope.onload = function() {
    socket.emit('get:catsandtags', 'please');
    if ($stateParams.slug && $stateParams.slug !== 'new') {
      console.log('requesting post');
      socket.emit('get:onepost', $stateParams.slug);
    }
  };

  $scope.savePost = function() {
    socket.emit('set:onepost', $scope.post);
  };

  $scope.addTag = function() {
    if ($scope.post.terms.tag.indexOf($scope.currentTag)===-1) {
      $scope.post.terms.tag.push($scope.currentTag);
    }
  };

  $scope.addCat = function() {
    if ($scope.post.terms.category.indexOf($scope.currentCat)===-1) {
      $scope.post.terms.category.push($scope.currentCat);
    }
  };

  $scope.getSlug = function() {
    socket.emit('get:generateslug', $scope.post.title);
  };
}
