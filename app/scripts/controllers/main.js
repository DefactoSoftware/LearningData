'use strict';

/**
 * @ngdoc function
 * @name learningDataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the learningDataApp
 */
angular.module('learningDataApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
