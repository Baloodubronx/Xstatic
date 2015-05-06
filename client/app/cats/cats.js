'use strict';

angular.module('xstaticApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cats', {
        url: '/cats',
        templateUrl: 'app/cats/cats.html',
        controller: 'CatsCtrl'
      });
  });
