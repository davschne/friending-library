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
        }
        //move logout to user controller
        // logout: function() {
        //   $cookies.put('tok', '');
        // },

        // isSignedIn: function() {
        //   return ($cookies.get('tok') && $cookies.get('tok').length);
        // }

      };
    };
  }]);

};
