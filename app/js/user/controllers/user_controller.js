'use strict';

module.exports = function(app) {

  app.controller('userController', ['$scope', '$location', 'userResource', '$cookies', function($scope, $location, userResource, $cookies) {

    var Http = userResource();

    (function() {

      if($location.search().access_token || ($cookies.get('tok').length > 3)) {
        runResource();
      }

      if($cookies.get('tok') === '' || !($cookies.get('tok'))) {
        $location.path('/');
      }

      function runResource() {

        var getToken = function() {
          if($location.search().access_token) {
            console.log('Ran True');
            var userToken = $location.search();
            $scope.user = userToken;
            $cookies.put('tok', $scope.user.access_token);
            $location.url('/success');
          } else {
            console.log('Ran Else');
            var token = {
              access_token : $cookies.get('tok')
            }
            $scope.user = token;
          }
        };

        getToken();


        var getUserData = function(user) {
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
        };

        getUserBooks($scope.user.access_token);

        $scope.submitBook = function(user, data) {
          Http.createBook(user, data, function(data) {
            console.log('Submit Success');
            console.log(data);
          });

          getUserBooks(user);

          delete $scope.newbook
        };

        $scope.destroyBook = function(user, bookId) {
          Http.removeBook(user, bookId, function(data) {
            console.log('Removed Book!');
            console.log(data);
          });

          getUserBooks(user);
        }

        $scope.logOut = function(){
          $cookies.put('tok', '');
          $location.path('/');
        }
      };

    })();

  }]);

};
