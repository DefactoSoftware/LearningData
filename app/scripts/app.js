'use strict';

/**
 * @ngdoc overview
 * @name learningDataApp
 * @description
 * # learningDataApp
 *
 * Main module of the application.
 */
angular
  .module('learningDataApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
