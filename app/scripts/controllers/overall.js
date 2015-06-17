'use strict';
angular.module('learningDataApp')
  .controller('MainCtrl', function ($scope, dataAPIservice, overallOptions, $filter, $rootScope, $location) {


    $scope.chartType = overallOptions.getChartType().value;
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.chartLegend = true;

    var storedSeries = [];

    $rootScope.overallStartup = function () {
      var dataType = overallOptions.getDataType();
      var selectedTenant = overallOptions.getSelectedTenant();
      var interval = overallOptions.getInterval().value;
      storedSeries = [];
      $scope.dataTypes = [];
      $scope.chartSeries = [];
      for (var i = 0; i < dataType.length ; i++) {
        if (dataType[i].checked === true) {
          $scope.dataTypes.push(dataType[i].field);
          storedSeries.push(dataType[i].name);
        }
      }
      var toDate = $filter('date')(overallOptions.getToDate(), 'dd/MM/yyyy');
      var fromDate = $filter('date')(overallOptions.getFromDate(), 'dd/MM/yyyy');

      var promise = dataAPIservice. getTenantStats($scope.dataTypes, selectedTenant, interval, fromDate, toDate);
      promise.then(function(result) {
        $scope.setupData(result);

      }, function() {
        $scope.dataLoaded = false;
        $scope.loading = false;
        $scope.loadingError = true;
        $scope.chartType = 'empty';
      });
    };

    $scope.setupData = function (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.chartType = overallOptions.getChartType(true).value;
      $scope.chartData = [];
      $scope.chartLabels = result.labels;
      $scope.chartSeries = storedSeries;
      for (var i = 0; i < $scope.dataTypes.length ; i++) {
        $scope.chartData.push(result.stats[$scope.dataTypes[i]]);
      }
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $rootScope.overallStartup();
  });
