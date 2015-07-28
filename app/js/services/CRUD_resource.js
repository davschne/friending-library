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

  // var userAuth = {'Authorization': 'Bearer' + user.access_token};

  app.factory('crudResource', ['$http', function($http) {
    return function() {
      return {
        getBooks: function(user, callback) {
          // var token = JSON.stringify(user);
          $http({
            method: 'GET',
            url: '/api/users',
            headers: {'Authorization': 'Bearer ' + user}
            //could pose problems check if need to replace not in variable
          })
          .success(callback)
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
