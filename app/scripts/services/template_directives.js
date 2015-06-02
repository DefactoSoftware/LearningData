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

  }).directive('leftsidebar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/leftSidebar.html'
     };

  }).directive('rightsidebar', function () {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/rightSidebar.html'
     };

  }).directive('navbar', function () {
    return {
      restring: 'E',
      templateUrl: 'views/partials/navbar.html'
    }
  });
