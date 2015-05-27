'use strict';
angular.module('learningDataApp')
  .controller('MainCtrl', function ($scope, dataAPIservice) {


    // var test = dataAPIservice.getTest()
    // console.log(test);


    var userTotals = dataAPIservice.getTotals('users', 'all tenants', '26/05/2015', '30/05/2015');
    console.log(userTotals);

    $scope.stats = userTotals.$object;

    console.log($scope.stats);

    // var test = dataAPIservice.getTest();
    // console.log(test);

    // $scope.completions = userTotals.completions;
    // $scope.labels = userTotals.labels;
  });
