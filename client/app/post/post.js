'use strict';

angular.module('xstaticApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/post',
        templateUrl: 'app/post/post.html',
        controller: 'PostCtrl'
      });
  });
