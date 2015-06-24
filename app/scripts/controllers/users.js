'use strict';
angular.module('learningDataApp')
  .controller('usersController', function ($scope, dataAPIservice, $filter) {
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.topUsers = true;
    $scope.tenantAmount = 10;
    $scope.chartType = 'pieChart';
    $scope.loginsOptions = {
      scaleLabel: function (valuePayload) {
        return valuePayload.value + '%';
      }
    };
    $scope.loginsLabels = [
      '00:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00', '03:00 - 04:00',
      '04:00 - 05:00', '05:00 - 06:00', '06:00 - 07:00', '07:00 - 08:00',
      '08:00 - 09:00', '09:00 - 10:00', '00:00 - 11:00', '11:00 - 12:00',
      '12:00 - 13:00', '13:00 - 14:00', '04:00 - 15:00', '15:00 - 16:00',
      '16:00 - 17:00', '17:00 - 18:00', '08:00 - 19:00', '19:00 - 20:00',
      '20:00 - 21:00', '21:00 - 22:00', '02:00 - 23:00', '23:00 - 00:00'
    ];

    dataAPIservice.getDailyTenantStats().then(function (tenantResult) {
      return dataAPIservice.getLoginStats().then(function (loginResult) {
        $scope.tenantResult = tenantResult;
        $scope.loginResult = loginResult;
        setupData();
      });
    }, function() {
      $scope.loading = false;
      $scope.loadingError = true;
    });

    function setupData () {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      setupTenantData($scope.tenantResult);
      setupLoginData($scope.loginResult);
    };

    function setupTenantData (result) {
      $scope.chartLabels = [];
      $scope.chartData = [];
      $scope.totalTenants = result.tenant_stats.length;
      var tenants = $scope.tenantAmount;
      var others = $scope.totalTenants - $scope.tenantAmount;
      var users = $filter('orderBy')( result.tenant_stats, function(item) { return parseInt(item.users); } , true );
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

    function setupLoginData (result) {
      var loginsTotal = result.logins;
      var loginsPercentual = [];
      var loginsSum = _.sum(loginsTotal);

      for (var i = 0 ; i < loginsTotal.length ; i++) {
        loginsPercentual.push(loginsTotal[i] / loginsSum * 100);
      }
      $scope.loginsData = [loginsPercentual];
    };

    $scope.switchChart = function (type, userSelectShow) {
      $scope.chartType = type;
      $scope.topUsers = userSelectShow;
    };
  });
