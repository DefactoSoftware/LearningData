'use strict';
angular.module('learningDataApp')
  .directive('partial', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.getContentUrl = function () {
          return 'views/partials/' + attrs.type + '.html';
        };
      },
      template: '<div ng-include="getContentUrl()"></div>'
    };

  }).directive('datasidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/dataSidebar.html'
     };

  }).directive('usersidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/userSidebar.html'
     };

  }).directive('navbar', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/navbar.html'
    }
  }).directive('loading', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/loading.html'
    }
  });
