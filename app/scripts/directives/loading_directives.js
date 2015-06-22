'use strict';
angular.module('learningDataApp')
  .directive('loadingimage', function () {
    return {
      restrict: 'E',
      scope: {
        criteria: '='
      },
      templateUrl: 'views/directives/loading_directive.html'
    };
  });






