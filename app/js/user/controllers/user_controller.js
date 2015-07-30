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

            $scope.selfRequests = data.requests;
          });
        };

        getUserData($scope.user.access_token);

        var getUserBooks = function(user) {
          Http.getBooks(user, function(data) {
            console.log('Book Grab Success');
            console.log(data);

            $scope.userBooks = data;

            $scope.bookRequests = [];
            $scope.borrowedBooks = [];

            for(var i = 0; i < $scope.userBooks.length; i++) {
              if($scope.userBooks[i].request) {
                $scope.bookRequests.push($scope.userBooks[i]);
              }
              if($scope.userBooks[i].borrower) {
                $scope.borrowedBooks.push($scope.userBooks[i]);
              }
            }
          });
        };

        getUserBooks($scope.user.access_token);

        $scope.askGoogle = function(userData) {
          Http.connectGoogleBooks(userData, function(data) {
            console.log('Google Data Back');
            console.log(data);

            var rawData = data.items;
            console.log(rawData);

            var usefulInfo = {
              "author" : data.items[0].volumeInfo.authors,
              "title" : data.items[0].volumeInfo.title,
              "genre" : data.items[0].volumeInfo.categories,
              "images" : data.items[0].volumeInfo.imageLinks,
              "description" : data.items[0].volumeInfo.description
            };

            $scope.googleData = usefulInfo;


            // for(var i = 0; i < rawData.length; i++) {

            // }
          });


        };

        $scope.submitBook = function(user, userData) {
          Http.createBook(user, userData, function(data) {
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
        };

        $scope.removeRequest = function(user, bookId) {
          Http.undoRequest(user, bookId, function(data) {
            console.log('Undo Request');
            console.log(data);
          });

          getUserBooks(user);
        };

        $scope.acceptRequest = function(user, userData) {
          Http.approveRequest(user, userData, function(data) {
            console.log('Request Accepted');
            console.log(data);
          });

          getUserBooks(user);
        };

        $scope.rejectRequest = function(user, userData) {
          Http.denyRequest(user, userData, function(data) {
            console.log('Request Rejected');
            console.log(data);
          });

          getUserBooks(user);
        };

        $scope.returnBook = function(user, userData) {
          Http.bookReturn(user, userData, function(data) {
            console.log('Book Returned');
            console.log(data);
          });

          getUserBooks(user);
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
