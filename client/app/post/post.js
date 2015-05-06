'use strict';

angular.module('xstaticApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        abstract : true,
        url: '/post',
        templateUrl: 'app/post/post.html',
      })
      .state('post.list', {
        url : '',
        templateUrl : 'app/post/list.html',
        controller: 'PostListCtrl',
      })
      .state('post.edit', {
        url: '/:slug',
        templateUrl : 'app/post/edit.html',
        controller : 'PostEditCtrl'
      })
      .state('post.new', {
        url : '/new',
        templateUrl : 'app/post/edit.html',
        controller : 'PostEditCtrl'
      });
  });
