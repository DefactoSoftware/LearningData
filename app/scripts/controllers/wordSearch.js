'use strict';
angular.module('learningDataApp')
  .controller('wordSearchController', function ($scope, dataAPIservice) {
    $scope.loading = false;
    $scope.dataLoaded = false;
    $scope.loadingError = false;

    $scope.searchWords = function () {
      if (typeof $scope.textToSearch !== 'undefined') {
        $scope.loading = true;
        $scope.dataLoaded = false;
        $scope.loadingError = false;
        var promise = dataAPIservice.getSearchWords($scope.textToSearch);
        promise.then(function(result) {
          $scope.setupData(result);
        }, function() {
          $scope.dataLoaded = false;
          $scope.loading = false;
          $scope.loadingError = true;
        });
      }
    };

    $scope.setupData = function (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.totals = result.totals;
      $scope.wordData = result.data;
    };
  });
