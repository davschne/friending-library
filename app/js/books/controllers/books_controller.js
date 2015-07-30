'use strict';

module.exports = function(app) {

  app.controller('booksController', ['$scope', 'bookResource', '$cookies', function($scope, bookResource, $cookies) {

    var Http = bookResource();

    var userToken = $cookies.get('tok');
    console.log(userToken);

    function populateBookPile (user) {
      Http.availableBooks(user, function(data) {
        console.log('Inside function');
        console.log(data);
        $scope.books = data;
      });
    }

    populateBookPile(userToken);

  }]);
};
