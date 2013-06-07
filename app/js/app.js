'use strict';


// Declare app level module which depends on filters, and services
angular.module('tweed', ['tweed.filters', 'tweed.services', 'tweed.directives', 'tweed.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/proof', {templateUrl: 'partials/proof.html', controller: 'MyCtrl1'});
    $routeProvider.when('/edit', {templateUrl: 'partials/edit.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/proof'});
  }]);
