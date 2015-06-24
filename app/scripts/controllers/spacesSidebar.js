'use strict';
angular.module('learningDataApp')
  .controller('spacesSidebarController', function ($scope, $rootScope) {
    $scope.$on('spacesStatsBroadcast', function(event, args) {
      $scope.space = args.stats.space
      $scope.tenant_name = args.stats.tenant_name
      $scope.completions = args.stats.completions
      $scope.subscriptions = args.stats.subscriptions
      $scope.rating = args.stats.rating
      $scope.color = args.color
    })
  });
