'use strict';
angular.module('learningDataApp', [
    'ngRoute',
    'restangular',
    'chart.js',
    'ui.bootstrap',
    'pretty-checkable',
    'localytics.directives',
    'ngCookies'
  ])

  .config(function (RestangularProvider, $routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/pages/overall.html', controller: 'MainCtrl' }).
      when('/login', {templateUrl: 'views/pages/login.html', controller: 'loginController' }).
      when('/users', {templateUrl: 'views/pages/users.html', controller: 'usersController' }).
      when('/spaces', {templateUrl: 'views/pages/spaces.html', controller: 'spacesController' }).
      when('/daily', {templateUrl: 'views/pages/daily.html', controller: 'dailyController' }).
      when('/wordSearch', {templateUrl: 'views/pages/wordSearch.html', controller: 'wordSearchController' }).
      when('/activeUsers', {templateUrl: 'views/pages/activeUsers.html', controller: 'activeUsersController' }).
      otherwise({ redirectTo: '/' });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  })
  .run(function (Restangular, $rootScope, $location, $cookieStore) {
    Restangular.setBaseUrl('https://lsdashboardapi.herokuapp.com/api/v1/data');
    $rootScope.$on( '$routeChangeStart', function() {
      $rootScope.bodyClass = $location.path().replace('/', '') + '-page';
      if ( $cookieStore.get('loggedIn') !== true) {
        $location.path('/login');
      }
      if ( $cookieStore.get('loggedIn') === true && $location.path() === '/login') {
        $location.path('/');
      }
    });
  });

