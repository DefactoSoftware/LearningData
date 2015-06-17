'use strict';
angular.module('learningDataApp')
  .controller('wordSearchController', function ($scope, $filter, dataAPIservice) {
    $scope.loading = false;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.sortSettings = {
          criteria : 'none',
          descending : false
    };

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
      $scope.setSortSettings('tenant_name');
    };

    $scope.$watch('sortSettings', function(newVal){
      $scope.wordData =  $filter('orderBy')( $scope.wordData, function(item) {
              if (newVal.criteria === 'tenant_name') {
                return item[newVal.criteria];
              } else {
                return parseInt(item[newVal.criteria]);
              } }, newVal.descending );
    },true);

    $scope.setSortSettings = function (criteria) {
      if (criteria === $scope.sortSettings.criteria ) {
        $scope.sortSettings.descending = !$scope.sortSettings.descending;
      } else {
        $scope.sortSettings.criteria = criteria;
        if (criteria === 'tenant_name' ) {
          $scope.sortSettings.descending = false;
        }else {
          $scope.sortSettings.descending = true;
        }
      }
    };
  });
