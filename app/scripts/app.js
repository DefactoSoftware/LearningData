'use strict';
angular

  .module('learningDataApp', ['ngRoute', 'restangular', 'chart.js', 'ui.bootstrap' ])

  .config(function (RestangularProvider, $routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/pages/data.html', controller: 'MainCtrl' }).
      when('/users', {templateUrl: 'views/pages/users.html', controller: 'usersController' }).
      when('/tenantStats', {templateUrl: 'views/pages/tenantStats.html', controller: 'tenantStatsController' }).
      otherwise({ redirectTo: '/' });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  })

  .run(function (Restangular) {
    Restangular.setBaseUrl('http://public.learning.local/api/v1/data');
  });
