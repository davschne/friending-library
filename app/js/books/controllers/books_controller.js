'use strict';

module.exports = function(app) {

  app.controller('booksController', ['$scope', 'bookResource', '$cookies', '$location', function($scope, bookResource, $cookies, $location) {

    var Http = bookResource();

    (function() {

      if($location.search().access_token || ($cookies.get('tok').length > 3)) {
        runResource();
      }

      if($cookies.get('tok') === '' || (!$cookies.get('tok'))) {
        $location.path('/');
      }

      function runResource() {

        var userToken = $cookies.get('tok');
        $scope.user = {
          access_token: userToken
        };

        var populateBookPile = function(user) {
          Http.availableBooks(user, function(data) {
            console.log('Inside function');
            console.log(data);

            $scope.books = data;

            for(var i = 0; i < $scope.books.length; i++) {
              $scope.books[i].showDescription = false;
            }

            $scope.toggleDescription = function(choice, bookObj) {
              if(choice === 1) {
                bookObj.showDescription = true;
              } else {
                bookObj.showDescription = false;
              }
            };

            if($scope.books.length === 0) {
              $scope.noBooks = true;
            } else {
              $scope.noBooks = false;
            }
          });
        };

        populateBookPile(userToken);

        $scope.checkBook = function(user, bookId) {
          Http.checkoutBook(user, bookId, function(data) {
            console.log('Checked Out');
            console.log(data);

            populateBookPile(user);
          });
        };

        $scope.userLogOut = function(user) {
          Http.logOut(user, function(data) {
            console.log('Logged Out');
            console.log(data);
          })

          $cookies.put('tok', '');
          $location.path('/');
        };
      };

    })();

  }]);

};
