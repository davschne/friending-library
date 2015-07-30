'use strict';

module.exports = function(app) {

  var handleError = function(err) {
      return function(err) {
      console.log('Mongo says: "ERROR" '  + err);

    };
  };

  app.factory('bookResource', ['$http' , function($http) {
    return function() {
      return {
        availableBooks: function(user, callback) {
          $http({
            method: 'GET',
            url: '/api/books/available',
            headers: {'Authorization': 'Bearer ' + user}
          })
          .success(callback)
          .error(handleError());
        }
      };
    };
  }]);

};
