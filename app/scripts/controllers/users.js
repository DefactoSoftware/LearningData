'use strict';
angular.module('learningDataApp')
  .controller('usersController', function ($scope, dataAPIservice, $filter) {
    $scope.loading = true;
    $scope.tenantAmount = 1;

    var tenantPromise = dataAPIservice.getDailyTenantStats();
      tenantPromise.then(function(result) {
        $scope.result = result
        $scope.setupData();
      }, function() {
        $scope.loading = false;
        $scope.loadingError = true;
      });

    $scope.setupData = function () {
      $scope.loading = false;
      $scope.chartLabels = [];
      $scope.chartData = [];
      $scope.totalTenants = $scope.result.all_data.length;
      var tenants = $scope.tenantAmount
      var others = $scope.totalTenants - $scope.tenantAmount
      var users = $filter('orderBy')($scope.result.all_data, 'users', true)
      var highestValues = _.take(users, tenants)
      var restValues = _.takeRight(users, others )
      var restSum = 0;

      for (var i = 0; i < $scope.tenantAmount ; i++) {
        $scope.chartLabels.push(highestValues[i].tenant_name);
        $scope.chartData.push(highestValues[i].users);
      }

      if (others > 0) {
        for (var i = 0; i < others ; i++) {
          restSum += parseInt(restValues[i].users)
        }
        $scope.chartLabels.push('other');
        $scope.chartData.push(restSum);
      }
    };
  });
