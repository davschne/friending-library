'use strict';

module.exports = function(app) {

  app.factory('authResource', ['$http', '$cookies', function($http, $cookies) {
    return function() {
      logIn: function() {
        $http({
          method: 'GET',
          url: '/auth/facebook'
          //Talk to back-end I'm not a fan maybe 'api/auth/facebook' doesnt matter too much
        })
        .success(function(data) {
          console.log(data);
          $cookies.put('eat', data.user.access_token);
        })
        .error(function(data) {
          console.log(data);
        });
      },

      logout: function() {
        $cookies.put('eat', '');
      },

      isSignedIn: function() {
        return ($cookies.get('eat') && $cookies.get('eat').length);
      }
    };
  }]);

};
