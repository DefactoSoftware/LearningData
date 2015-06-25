'use strict';
angular.module('learningDataApp')
  .controller('overallSidebarController', function ($scope, overallOptions, dataAPIservice, $rootScope) {

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
    $scope.oneAtATime = true;

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    dataAPIservice.getTenants().then(function(result) {
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
        $rootScope.$broadcast('overallStartup');
      }
    };

    $scope.checkOptions = function () {
      var data = _.find($scope.dataType, {'checked' : true});
      $scope.correctOptions = !!data;
      $scope.correctDates = ($scope.toDate >= $scope.fromDate);
      return ($scope.correctOptions && $scope.correctDates);
    };

    $scope.open = function($event, type) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened.top = false;
      $scope.opened.bottom = false;
      $scope.opened[type] = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
    };
  });
