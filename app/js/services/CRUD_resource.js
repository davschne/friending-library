'use strict';

module.exports = function(app) {

  var handleSuccess = function(data) {
    return function(data) {
      console.log('Mongo says: "All Good"');
      console.log(data);
    };
  };

  var handleError = function(err) {
      return function(err) {
      console.log('Mongo says: "ERROR" '  + err);

    };
  };

  app.factory('crudResource', ['$http', function($http) {
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

        createBook: function(user, data, callback) {
          $http({
            method: 'POST',
            url: '/api/books',
            headers:  {'Authorization': 'Bearer ' + user},
            data: data
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },

        removeBook: function(user, bookId, callback) {
          $http({
            method: 'DELETE',
            url: '/api/books/' + bookId,
            headers: {'Authorization': 'Bearer ' + user},
          })
          .success(handleSuccess(callback))
          .error(handleError());
        }
      };
    };
  }]);

};
