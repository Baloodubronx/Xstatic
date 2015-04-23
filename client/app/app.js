'use strict';

angular
  .module('xstaticApp', [
    'ui.router',
    'ui.codemirror'
  ])

  .config(function ( $locationProvider, $urlRouterProvider ) {
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })

  .run(function() {

  })

  .factory('_', function() {
		return window._; // load underscore/lodash if we have it
	});
