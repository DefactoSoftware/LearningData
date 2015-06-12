'use strict';
angular.module('learningDataApp')
  .controller('activeUserSidebarController', function ($scope, activeUserOptions, dataAPIservice) {

    $scope.interval = activeUserOptions.getInterval();
    $scope.fromDate = activeUserOptions.getFromDate();
    $scope.toDate = activeUserOptions.getToDate();
    $scope.selectedTenant = activeUserOptions.getSelectedTenant();
    $scope.correctDates = true;

    $scope.minDate = $scope.fromDate;
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

    var promise = dataAPIservice. getTenants();
    promise.then(function(result) {
      $scope.tenants = result.tenants;
      $scope.tenants.splice(0,0, 'all tenants');
    }, function() {
      console.log('could not load tenants');
    });

    $scope.setOptions = function () {
      activeUserOptions.setInterval($scope.interval);
      activeUserOptions.setFromDate($scope.fromDate);
      activeUserOptions.setToDate($scope.toDate);
      activeUserOptions.setSelectedTenant($scope.selectedTenant);
      if ($scope.checkOptions() === true){
        $scope.activeUserStartup();
      }
    };

    $scope.checkOptions = function () {
      $scope.correctDates = ($scope.toDate <= $scope.fromDate) ? false : true;
      return ($scope.correctDates);
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
