'use strict';
angular.module('learningDataApp')
  .controller('usersController', function ($scope, dataAPIservice, $filter) {
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.tenantAmount = 1;

    var tenantPromise = dataAPIservice.getDailyTenantStats();
      tenantPromise.then(function(result) {
        $scope.result = result;
        $scope.setupData();
      }, function() {
        $scope.loading = false;
        $scope.loadingError = true;
      });

    $scope.setupData = function () {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.chartLabels = [];
      $scope.chartData = [];
      $scope.totalTenants = $scope.result.tenant_stats.length;
      var tenants = $scope.tenantAmount;
      var others = $scope.totalTenants - $scope.tenantAmount;
      var users = $filter('orderBy')( $scope.result.tenant_stats, 'users', true );
      var highestValues = _.take( users, tenants );
      var restValues = _.takeRight( users, others );
      var restSum = 0;

      for (var i = 0; i < $scope.tenantAmount ; i++) {
        $scope.chartLabels.push(highestValues[i].tenant_name);
        $scope.chartData.push(highestValues[i].users);
      }

      if (others > 0) {
        for (var j = 0; j < others ; j++) {
          restSum += parseInt(restValues[j].users);
        }
        $scope.chartLabels.push('other');
        $scope.chartData.push(restSum);
      }
    };
  });
