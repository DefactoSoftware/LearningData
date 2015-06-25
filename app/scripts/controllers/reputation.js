'use strict';
angular.module('learningDataApp')
  .controller('reputationController', function ($scope, dataAPIservice, $filter) {

    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.sortSettings = {
      criteria : 'none',
      descending : false
    };
    dataAPIservice.getReputationStats().then(function(result) {
      setupData(result);
    }, function() {
      $scope.dataLoaded = false;
      $scope.loading = false;
      $scope.loadingError = true;
    });

    function setupData (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.tenantStats = result.tenant_stats;
      $scope.setSortSettings('tenant_name');
      $scope.totals = result.totals
      $scope.totals['tenant_name'] = 'Totals'
      $scope.reputationStats = result.data
    };

    $scope.$watch('sortSettings', function(newVal){
      $scope.reputationStats =  $filter('orderBy')( $scope.reputationStats, function(item) {
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
        $scope.sortSettings.descending = !(criteria === 'tenant_name');
      }
    };
  });

