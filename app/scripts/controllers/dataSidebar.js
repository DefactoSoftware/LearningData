'use strict';
angular.module('learningDataApp')
  .controller('dataSidebarController', function ($scope, overallOptions, dataAPIservice) {

    $scope.dataType = overallOptions.getDataType();
    $scope.interval = overallOptions.getInterval();
    $scope.chartType = overallOptions.getChartType();
    $scope.fromDate = overallOptions.getFromDate();
    $scope.toDate = overallOptions.getToDate();
    $scope.selectedTenant = overallOptions.getSelectedTenant();
    $scope.correctOptions = true;
    $scope.correctDates = true;
    $scope.minDate =  overallOptions.getMinDate();
    $scope.maxDate = new Date();
    $scope.opened = {};
    $scope.dataRows = [ [$scope.dataType[0], $scope.dataType[1]], [$scope.dataType[2], $scope.dataType[3]] ];
    $scope.oneAtATime = true;

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    var promise = dataAPIservice. getTenants();
    promise.then(function(result) {
      $scope.tenants = result.tenants;
      $scope.tenants.splice(0,0, 'all tenants');
    }, function() {
      console.log('could not load tenants');
    });

    $scope.setOptions = function () {
      overallOptions.setDataType($scope.dataType);
      overallOptions.setInterval($scope.interval);
      overallOptions.setChartType($scope.chartType);
      overallOptions.setFromDate($scope.fromDate);
      overallOptions.setToDate($scope.toDate);
      overallOptions.setSelectedTenant($scope.selectedTenant);
      if ($scope.checkOptions() === true){
        $scope.overallStartup();
      }
    };

    $scope.checkOptions = function () {
      var data = _.find($scope.dataType, {'checked' : true});
      $scope.correctOptions = (data === undefined) ? false : true;
      $scope.correctDates = ($scope.toDate <= $scope.fromDate) ? false : true;
      return ($scope.correctOptions && $scope.correctDates);
    };

    $scope.open = function($event, type) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened[type] = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
    };
  });
