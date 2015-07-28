'use strict';

module.exports = function(app) {

  app.controller('booksController', ['$scope', 'crudResource', function($scope, crudResource) {

    var Http = crudResource();

    $scope.populateBookList = function(user) {
      console.log(user);
      Http.getBooks(user, function(data) {
        console.log('Inside function');
        $scope.books = data;
      });
    }

  }]);
};
