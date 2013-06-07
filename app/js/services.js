'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('tweed.services', []).value('version', '0.1');

// User model
app.factory('Text', [function() {
  var Text = {};

  Text.original = 'Your text goes here...';
  Text.edited = Text.original;

  return Text;
}]);
