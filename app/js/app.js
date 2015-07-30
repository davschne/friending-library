'use strict';

debugger;

require('angular/angular');
require('angular-route');
require('angular-cookies');

var friendingLibrary = angular.module('friendingLibrary', ['ngRoute', 'ngCookies']);

//services
require('./services/user_resource')(friendingLibrary);
require('./books/services/book_resource.js')(friendingLibrary);


//controllers
// require('./welcome/controllers/welcome_controller.js')(friendingLibrary);
require('./user/controllers/user_controller')(friendingLibrary);
require('./books/controllers/books_controller.js')(friendingLibrary);

//routes
friendingLibrary.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/success', {
      templateUrl: '/templates/views/user-panel.html',
      controller: 'userController'
    })
    .when('/', {
      templateUrl: '/templates/views/sign-in.html',
      // controller: 'authController'
    })
    .when('/pile', {
      templateUrl: '/templates/views/book-pile.html',
      controller: 'booksController'
    })

}]);
