'use strict';

module.exports = function(app) {

  var handleError = function(err) {
    console.log('Trouble ' + err);
  }

  app.factory('authResource', ['$http', '$cookies', function($http, $cookies) {
    return function() {
      return {
      logIn: function(callback) {
          $http({
            method: 'GET',
            url: '/login'
          })
          .success(callback)
          .error(handleError);
        },

        logout: function() {
          // $cookies.put('eat', '');
        },

        isSignedIn: function() {
          // return ($cookies.get('eat') && $cookies.get('eat').length);
        }
      };
    };
  }]);

};
