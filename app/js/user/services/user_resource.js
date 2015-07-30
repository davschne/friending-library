'use strict';

module.exports = function(app) {

  var handleError = function(err) {
      return function(err) {
      console.log('Mongo says: "ERROR" '  + err);

    };
  };

  app.factory('userResource', ['$http', function($http) {
    return function() {
      return {
        getUser: function(user, callback) {
          // var token = JSON.stringify(user);
          $http({
            method: 'GET',
            url: '/api/self',
            headers: {'Authorization': 'Bearer ' + user}
            //white space in 'Bearer ' + user is crucial needs to be Bearer 1223142134 when sent
          })
          .success(callback)
          .error(handleError());
        },

        getBooks: function(user, callback) {
          $http({
            method: 'GET',
            url: '/api/self/books',
            headers: {'Authorization': 'Bearer ' + user}
          })
          .success(callback)
          .error(handleError());
        },

        createBook: function(user, userData, callback) {
          $http({
            method: 'POST',
            url: '/api/books',
            headers:  {'Authorization': 'Bearer ' + user},
            data: userData
          })
          .success(callback)
          .error(handleError());
        },

        removeBook: function(user, bookId, callback) {
          $http({
            method: 'DELETE',
            url: '/api/books/' + bookId,
            headers: {'Authorization': 'Bearer ' + user},
          })
          .success(callback)
          .error(handleError());
        },

        undoRequest: function(user, userData, callback) {
          $http({
            method: 'DELETE',
            url: '/api/trans/request',
            headers: {'Authorization': 'Bearer ' + user},
            data: userData
          })
          .success(callback)
          .error(handleError());
        }
      };
    };
  }]);

};
