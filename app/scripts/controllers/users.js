'use strict';
angular.module('learningDataApp')
  .controller('usersController', function ($scope, dataAPIservice, $filter) {
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.topUsers = true;
    $scope.tenantAmount = 1;
    $scope.chartType = 'pieChart';
    $scope.loginsOptions = {
      scaleLabel: function (valuePayload) {
        return valuePayload.value + '%';

      }
    };

    dataAPIservice.getDailyTenantStats().then(function (tenantResult) {
      return dataAPIservice.getLoginStats().then(function (loginResult) {
        $scope.tenantResult = tenantResult;
        $scope.loginResult = loginResult;
        $scope.setupData();
      });
    }, function() {
      $scope.loading = false;
      $scope.loadingError = true;
    });

    $scope.setupData = function () {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.setupTenantData($scope.tenantResult);
      $scope.setupLoginData($scope.loginResult);
    };

    $scope.setupTenantData = function (result) {
      $scope.chartLabels = [];
      $scope.chartData = [];
      $scope.totalTenants = result.tenant_stats.length;
      var tenants = $scope.tenantAmount;
      var others = $scope.totalTenants - $scope.tenantAmount;
      var users = $filter('orderBy')( result.tenant_stats, 'users', true );
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

    $scope.setupLoginData = function (result) {
      console.log(result)
      var loginsTotal = result.logins;
      var loginsPercentual = [];
      var loginsSum = _.sum(loginsTotal);

      for (var i = 0 ; i < loginsTotal.length ; i++) {
        loginsPercentual.push(loginsTotal[i] / loginsSum * 100)
      }
      $scope.loginsData = [loginsPercentual];
      $scope.loginsLabels = result.labels;
    };

    $scope.switchChart = function (type, userSelectShow) {
      $scope.chartType = type;
      $scope.topUsers = userSelectShow;
    }

  });
