'use strict';

/**
 * @ngdoc function
 * @name learningDataApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the learningDataApp
 */
angular.module('learningDataApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
