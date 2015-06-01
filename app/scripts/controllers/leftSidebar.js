'use strict';
angular.module('learningDataApp')
  .controller('leftSidebarController', function ($scope, dataOptions) {

    $scope.dataType = dataOptions.getDataType();
    $scope.interval = dataOptions.getInterval();
    $scope.chartType = dataOptions.getChartType(false);
    $scope.fromDate = dataOptions.getFromDate();
    $scope.toDate = dataOptions.getToDate();


    $scope.switch = function (position, interval) {
      angular.forEach(interval, function(type, index) {
        if (position !== index) {
          type.checked = false;
        }
      });
    };

    $scope.setOptions = function () {
      dataOptions.setDataType($scope.dataType);
      dataOptions.setInterval($scope.interval);
      dataOptions.setChartType($scope.chartType);
      dataOptions.setFromDate($scope.fromDate);
      dataOptions.setToDate($scope.toDate);
      $scope.startup();
    };

    $scope.minDate = $scope.fromDate;
    $scope.maxDate = new Date();
    $scope.opened = {};


    $scope.open = function($event, type) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened[type] = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
    };
  });
