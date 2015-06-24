'use strict';
angular.module('learningDataApp')
  .controller('activeUsersController', function ($scope, $filter, activeUserOptions, dataAPIservice, $rootScope) {

    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.chartLegend = false;
    $scope.chartSeries = ['active users'];
    $scope.chartType = 'lineChart';

    $scope.$on('activeUserStartup', function(event, args) {
      startup();
    })

    function startup() {
      var selectedTenant = activeUserOptions.getSelectedTenant();
      var interval = activeUserOptions.getInterval().value;
      var toDate = $filter('date')(activeUserOptions.getToDate(), 'dd/MM/yyyy');
      var fromDate = $filter('date')(activeUserOptions.getFromDate(), 'dd/MM/yyyy');

      dataAPIservice. getTenantStats(
        'active_users',
        selectedTenant,
        interval,
        fromDate,
        toDate
      ).then(function(result) {
        setupData(result);
      }, function() {
        $scope.dataLoaded = false;
        $scope.loading = false;
        $scope.loadingError = true;
        $scope.chartType = 'emptyChart';
      });
    };

    function setupData (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.chartLabels = result.labels;
      $scope.chartType = 'lineChart';
      $scope.chartData = [result.stats.active_users];
    };

    startup();
  });
