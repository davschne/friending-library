'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');

var friendingLibrary = angular.module('friendingLibrary', ['ngRoute', 'ngCookies']);

//services
require('./auth/services/auth_resource.js')(friendingLibrary);
require('./services/CRUD_resource.js')(friendingLibrary);

//controllers
require('./welcome/controllers/welcome_controller.js')(friendingLibrary);
require('./auth/controllers/auth_controller.js')(friendingLibrary);

//routes
friendingLibrary.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/another', {
      templateUrl: 'templates/views/welcome.html',
      controller: 'welcomeController'
    });
}]);
