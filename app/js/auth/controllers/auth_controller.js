'use strict';

module.exports = function(app) {

  app.controller('authController', ['$scope', '$location', 'crudResource', '$cookies', function($scope, $location, crudResource, $cookies) {

    var Http = crudResource();

    function getToken() {
      var userToken = $location.search();
      // console.log(userToken);

      $scope.user = userToken;

      $cookies.put('tok', $scope.user.access_token);
      var munny = $cookies.get('tok')

      // console.log(munny);
      // console.log(typeof(munny));

      $cookies.put('tok', '');

    };

    getToken();

    // console.log($scope.user);

    function getUserData(user) {
      Http.getUser(user, function(data) {

        console.log('User Grab Success');
        console.log(data);

      });

    };

    getUserData($scope.user.access_token);

    var getUserBooks = function(user) {
      Http.getBooks(user, function(data) {
        console.log('Book Grab Success');
        console.log(data);

        $scope.Userbooks = data;
      });

    }

    getUserBooks($scope.user.access_token);

    $scope.submitBook = function(user, data) {
      Http.createBook(user, data, function(data) {
        console.log('Submit Success');
        console.log(data);
      });

      getUserBooks(user);
    }









        // $scope.user = data;

        // $cookies.put('eat', data.user.access_token);



  }]);

}
