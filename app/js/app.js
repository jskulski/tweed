'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('tweed', ['tweed.filters', 'tweed.services', 'tweed.directives', 'tweed.controllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/proof', {templateUrl: 'partials/proof.html', controller: Proofer});
  $routeProvider.when('/edit', {templateUrl: 'partials/edit.html', controller: Editor});
  $routeProvider.otherwise({redirectTo: '/proof'});
}]);
