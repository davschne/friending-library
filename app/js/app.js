'use strict';

require('angular/angular');
require('angular-route');

var friendingLibrary = angular.module('friendingLibrary', ['ngRoute']);

//controllers
require('./welcome/controllers/welcome_controller.js')(friendingLibrary);

//routes
friendingLibrary.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/views/welcome.html',
      controller: 'welcomeController'
    });
}]);
