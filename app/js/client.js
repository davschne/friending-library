'use strict';

debugger;

require('angular/angular');
require('angular-route');
require('angular-cookies');

var friendingLibrary = angular.module('friendingLibrary', ['ngRoute', 'ngCookies']);

//services
require('./auth/services/auth_resource')(friendingLibrary);
require('./user/services/user_resource')(friendingLibrary);
require('./books/services/book_resource')(friendingLibrary);


//controllers
require('./auth/controllers/auth_controller')(friendingLibrary);
require('./user/controllers/user_controller')(friendingLibrary);
require('./books/controllers/books_controller')(friendingLibrary);

//routes
friendingLibrary.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/success', {
      templateUrl: '/templates/views/user-panel.html',
      controller: 'userController'
    })
    .when('/requests', {
      templateUrl: '/templates/views/user-requests.html',
      controller: 'userController'
    })
    .when('/', {
      templateUrl: '/templates/views/sign-in.html',
      controller: 'authController'
    })
    .when('/pile', {
      templateUrl: '/templates/views/book-pile.html',
      controller: 'booksController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
