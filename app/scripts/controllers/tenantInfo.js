'use strict';
angular.module('learningDataApp')
  .controller('tenantInfoController', function ($scope, dataAPIservice, dataOptions, $filter) {
    $scope.loading = true;
    var toDate = $filter('date')(dataOptions.getToDate(), 'dd/MM/yyyy');
    var fromDate = $filter('date')(dataOptions.getFromDate(), 'dd/MM/yyyy');

    var promise = dataAPIservice.getTenantInfo('all tenants', fromDate, toDate);
      promise.then(function(result) {
        $scope.setupData(result);
      }, function() {
        $scope.loading = false;
        $scope.loadingError = true;
      });

    $scope.setupData = function (result) {
      $scope.loading = false;
      $scope.tenantInfo = result.data;
    };
  });
