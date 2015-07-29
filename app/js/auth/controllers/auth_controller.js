'use strict';

module.exports = function(app) {

  app.controller('authController', ['$scope', '$location', 'crudResource', '$cookies', function($scope, $location, crudResource, $cookies) {

    var Http = crudResource();

    function getToken() {

      var userToken = $location.search();
      console.log(userToken);

      $scope.user = userToken;

      $cookies.put('tok', $scope.user.access_token);
      var munny = $cookies.get('tok')

      console.log(munny);
      console.log(typeof(munny));

      $cookies.put('tok', '');

    };

    getToken();

    console.log($scope.user);

    function getUser(user) {

      Http.getBooks(user, function(data) {

        console.log('Success');
        console.log(data);

        $scope.libUser = data;
      });

    };

    getUser($scope.user.access_token);

    $scobe.submitBook = function(user, data) {

      Http.createBook(user, data, function(data) {

        console.log('Success');
        console.log(data);

        getUser(user);
      });
    }









        // $scope.user = data;

        // $cookies.put('eat', data.user.access_token);



  }]);

}
