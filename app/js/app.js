'use strict';

debugger;

require('angular/angular');
require('angular-route');
require('angular-cookies');

var friendingLibrary = angular.module('friendingLibrary', ['ngRoute', 'ngCookies']);

//services
require('./services/CRUD_resource')(friendingLibrary);
// require('./auth/services/auth_resource.js')(friendingLibrary);


//controllers
// require('./welcome/controllers/welcome_controller.js')(friendingLibrary);
require('./auth/controllers/auth_controller')(friendingLibrary);
// require('./books/controllers/books_controller.js')(friendingLibrary);

//routes
friendingLibrary.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/success', {
      templateUrl: '/templates/views/user-panel.html',
      controller: 'authController'
    })
    .when('/', {
      templateUrl: '/templates/views/sign-in.html',
      // controller: 'authController'
    });

}]);
