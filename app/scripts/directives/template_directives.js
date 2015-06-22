'use strict';
angular.module('learningDataApp')
  .directive('partial', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.getContentUrl = function () {
          return 'views/partials/charts/' + attrs.type + '.html';
        };
      },
      template: '<div ng-include="getContentUrl()"></div>'
    };

  }).directive('datasidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/bars/dataSidebar.html'
     };
  }).directive('activeusersidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/bars/activeUserSidebar.html'
     };
  }).directive('usersidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/bars/userSidebar.html'
     };
  }).directive('navbar', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/bars/navbar.html'
    };
  }).directive('loading', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/loading.html'
    };
  }).directive('customdatepicker', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/datepicker.html'
    };
  });
