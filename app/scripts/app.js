'use strict';
angular
  .module('learningDataApp', ['ngRoute', 'restangular', 'chart.js', 'ui.bootstrap', 'pretty-checkable', 'localytics.directives'])

  .config(function (RestangularProvider, $routeProvider, $locationProvider) {
    var authenticationToken = btoa('username:password');

    $routeProvider.
      when('/', {templateUrl: 'views/pages/overall.html', controller: 'MainCtrl' }).
      when('/users', {templateUrl: 'views/pages/users.html', controller: 'usersController' }).
      when('/daily', {templateUrl: 'views/pages/daily.html', controller: 'dailyController' }).
      when('/wordSearch', {templateUrl: 'views/pages/wordSearch.html', controller: 'wordSearchController' }).
      when('/activeUsers', {templateUrl: 'views/pages/activeUsers.html', controller: 'activeUsersController' }).
      otherwise({ redirectTo: '/' });

      RestangularProvider.setDefaultHeaders({Authorization: 'Basic ' + authenticationToken});

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  })

  .run(function (Restangular) {
    Restangular.setBaseUrl('http://public.learning.local/api/v1/data');
  });
