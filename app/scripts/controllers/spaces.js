'use strict';
angular.module('learningDataApp')
  .controller('spacesController', function ($scope, dataAPIservice, $filter, $rootScope) {

    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;
    $scope.chartType = 'pieChart';
    $scope.spaceSelected = false;
    $scope.colours = [
    '#10E449', // green
    '#2A0AFC', // blue
    '#2BE9E3', // teal
    '#F7464A', // red
    '#000000',  // black
    '#199800',  // dark green
    '#FFB300', // orange
    '#F610D7', // purple
    '#D4D408',  // yellow
    '#6F0A7A'  // dark purple
    ];

    dataAPIservice.getSpacesStats().then(function(result) {
      setupData(result);
    }, function() {
      $scope.dataLoaded = false;
      $scope.loading = false;
      $scope.loadingError = true;
    });

    function setupData(result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.chartLabels = [];
      $scope.chartData = [];
      $scope.spaces = $filter('orderBy')( result.stats, 'rating' , true );

      var highestValues = _.take( $scope.spaces, 10 );
      for (var i = 0; i < highestValues.length ; i++) {
        $scope.chartLabels.push(highestValues[i].space);
        $scope.chartData.push(highestValues[i].rating);
      }
    };

    $scope.onClick = function (point, event) {
      if (point.length !== 0){
        $scope.spaceSelected = true;
        var color = point[0]._saved.fillColor
        var spaceStats = _.find($scope.spaces, 'space', point[0].label);
        $rootScope.$broadcast('spacesStatsBroadcast', { stats: spaceStats, color: color});
      }
    };
  });
