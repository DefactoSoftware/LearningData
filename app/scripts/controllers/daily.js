'use strict';
angular.module('learningDataApp')
  .controller('dailyController', function ($scope, dataAPIservice, $filter) {
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.sortSettings = {
      criteria : 'none',
      descending : false
    };
    var promise = dataAPIservice.getDailyTenantStats();
      promise.then(function(result) {
        $scope.setupData(result);
      }, function() {
        $scope.dataLoaded = false;
        $scope.loading = false;
        $scope.loadingError = true;
      });

    $scope.setupData = function (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.tenantStats = result.tenant_stats;
      $scope.setSortSettings('tenant_name');

      $scope.totals = {};
      $scope.totals.users = 0;
      $scope.totals.spaces = 0;
      $scope.totals.chapters = 0;
      $scope.totals.completions = 0;
      $scope.totals.active_users = 0;
      $scope.totals.activity = 0;
      $scope.totals.tenant_name = 'Totals';

      for (var i = 0 ; i < $scope.tenantStats.length ; i++) {
        $scope.totals.users += parseInt($scope.tenantStats[i].users);
        $scope.totals.spaces += parseInt($scope.tenantStats[i].spaces);
        $scope.totals.chapters += parseInt($scope.tenantStats[i].chapters);
        $scope.totals.completions += parseInt($scope.tenantStats[i].completions);
        $scope.totals.active_users += parseInt($scope.tenantStats[i].active_users);
        $scope.totals.activity += parseInt($scope.tenantStats[i].activity);
      }
    };

    $scope.$watch('sortSettings', function(newVal){
      $scope.tenantStats =  $filter('orderBy')( $scope.tenantStats, function(item) {
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
