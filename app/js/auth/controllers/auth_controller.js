'use strict';

module.exports = function(app) {

  app.controller('authController', ['$scope', '$location', 'authResource', '$cookies', function($scope, $location, authResource, $cookies) {

    var Http = authResource();

    var grabToken = function() {
      return function() {
        var token = {
          access_token : $cookies.get('tok')
        };

        $scope.userToken = token;
      };
      console.log('Ran grabToken');
    };

    grabToken();

    $scope.userLogOut = function(user) {
      Http.logOut(user, function(data) {
        console.log('Logged Out');
        console.log(data);
      })

      $cookies.put('tok', '');
      $location.path('/');
    };

  }]);

};
