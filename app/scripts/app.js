'use strict';
angular

  .module('learningDataApp', ['ngRoute', 'restangular', 'chart.js', 'ui.bootstrap' ])

  .config(function (RestangularProvider, $routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl' }).
      when('/tenantInfo', {templateUrl: 'views/tenantInfo.html', controller: 'tenantInfoController' }).
      otherwise({ redirectTo: '/' });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  })

  .run(function (Restangular) {
    Restangular.setBaseUrl('http://public.learning.local/api/v1/data');
  });
