'use strict';

module.exports = function(app) {

  app.controller('welcomeController', ['$scope', function($scope) {

    $scope.hello = "hello";

  }]);

};
