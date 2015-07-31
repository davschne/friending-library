'use strict';

module.exports = function(app) {

  var handleError = function(err) {
    console.log('Trouble ' + err);
  }

  app.factory('authResource', ['$http', '$cookies', function($http, $cookies) {
    return function() {
      return {
      logOut: function(user, callback) {
          $http({
            method: 'POST',
            url: '/logout',
            headers: {'Authorization': 'Bearer ' + user}
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
