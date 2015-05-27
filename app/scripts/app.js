'use strict';
angular

  .module('learningDataApp', ['ngRoute', 'restangular'])

  .config(function (RestangularProvider, $routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl' }).
      otherwise({ redirectTo: '/' });
  })

  .run(function (Restangular) {
    Restangular.setBaseUrl('http://public.learning.local/api/v1/data');
  });
