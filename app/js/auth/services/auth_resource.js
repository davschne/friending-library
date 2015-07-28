'use strict';

module.exports = function(app) {

  app.factory('authResource', ['$http', '$cookies', function($http, $cookies) {
    return function() {
      return {
      logIn: function(data) {
          $http({
            method: 'GET',
            url: '/auth/facebook'
          })
          .success(function(data) {
            console.log(data);
            // $cookies.put('eat', data.user.access_token);
          })
          .error(function(data) {
            console.log(data);
          });
        },

        testLogin: function(data, err) {
          $http({
            method: 'GET',
            url: '/api/test'
          })
          .success(function(data) {
            console.log(data);
          })
          .error(function(err) {
            console.log(err);
          })
        },

        logout: function() {
          $cookies.put('eat', '');
        },

        isSignedIn: function() {
          return ($cookies.get('eat') && $cookies.get('eat').length);
        }
      };
    };
  }]);

};
