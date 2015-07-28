'use strict';

module.exports = function(app) {

  var handleSuccess = function(callback) {
    return function(data) {
      console.log('Mongo says: "All Good"');
      console.log(data);

      callback(data);
    };
  };

  var handleError = function(err) {
    return function(err) {
      console.log('Mongo says: "ERROR" '  + err);
    };
  };

  var userAuth = {'Authorization', 'Bearer' + user.access_token};

  app.factory('crudResource', ['$http', function($http) {
    return function() {
      return {
        getBooks: function(user, callback) {
          var token = user.access_token;
          $http({
            method: 'GET',
            url: '/api/books',
            headers: userAuth
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },

        createBook: function(user, data, callback) {
          $http({
            method: 'POST',
            url: '/api/books',
            headers: userAuth,
            data: data
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },

        removeBook: function(user, callback) {
          $http({
            method: 'DELETE',
            url: '/api/books',
            headers: userAuth,
            data: {_id : user.id}
          })
          .success(handleSuccess(callback))
          .error(handleError());
        }
      };
    };
  }]);

};
