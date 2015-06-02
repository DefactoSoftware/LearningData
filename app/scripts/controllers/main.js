'use strict';
angular.module('learningDataApp')
  .controller('MainCtrl', function ($scope, dataAPIservice, dataOptions, $filter, $rootScope, $location) {

    // $scope.interval = dataOptions.getInterval();
    $scope.chartType = dataOptions.getChartType(true);
    $scope.loading = true;
    var storedSeries = [];

    $rootScope.startup = function () {


      var dataType = dataOptions.getDataType();
      storedSeries = [];
      $scope.dataTypes = [];
      $scope.chartSeries = [];
      for (var i = 0; i < dataType.length ; i++) {
        if (dataType[i].checked === true) {
          $scope.dataTypes.push(dataType[i].field);
          storedSeries.push(dataType[i].name);
        }
      }
      var toDate = $filter('date')(dataOptions.getToDate(), 'dd/MM/yyyy');
      var fromDate = $filter('date')(dataOptions.getFromDate(), 'dd/MM/yyyy');

      var promise = dataAPIservice.getTotals($scope.dataTypes, fromDate, toDate);
      promise.then(function(result) {
        $scope.setupData(result);

      }, function() {
        $scope.loading = false;
        $scope.loadingError = true;
      });
    };

    $scope.setupData = function (result) {
      $scope.chartType = dataOptions.getChartType(true);
      $scope.chartData = [];
      $scope.chartLabels = result.labels;
      $scope.loading = false;
      $scope.loadingError = false;
      $scope.chartSeries = storedSeries;
      for (var i = 0; i < $scope.dataTypes.length ; i++) {
        $scope.chartData.push(result.stats[$scope.dataTypes[i]]);
      }
      // console.log($scope.chartLabels)
      // console.log($scope.chartSeries)
      // console.log($scope.chartData)
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $rootScope.startup();
  });
