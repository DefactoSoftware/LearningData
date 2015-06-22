'use strict';
angular.module('learningDataApp')
  .controller('loginController', function ($scope, dataAPIservice, $cookieStore, $location) {
    $scope.location = $location;

    $scope.login = function () {
      $scope.loading = true;
      $scope.badLogin = false;
      var authenticationHeader = {'Authorization': 'Basic ' + btoa($scope.username + ':' + $scope.password)};
      dataAPIservice.loginAPI(authenticationHeader).then(function() {
        $scope.loginSuccesfull(authenticationHeader);
      }, function() {
        $scope.loginUnsuccesfull();
      });
    };

    $scope.loginSuccesfull = function (authenticationHeader) {
      $location.path('/');
      $cookieStore.put('authenticationHeader', authenticationHeader);
      $cookieStore.put('loggedIn', true);
    };

    $scope.loginUnsuccesfull = function () {
      $scope.loading = false;
      $scope.badLogin = true;
    };

    $scope.logout = function () {
      $location.path('/login');
      $cookieStore.remove('authenticationHeader');
      $cookieStore.remove('loggedIn');
    };
  });
