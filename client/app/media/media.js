'use strict';

angular.module('xstaticApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('media', {
        url: '/media',
        templateUrl: 'app/media/media.html',
        controller: 'MediaCtrl'
      });
  });
