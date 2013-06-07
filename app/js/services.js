'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('tweed.services', []).value('version', '0.1');

// User model
app.factory('Text', [function() {
  var Text = {};

  Text.setText = function TextSetText(text) {
    Text.original = text;
    Text.edited = Text.chop(text);
  }

  Text.chop = function(text) {
    return text.split(' ');
  }

  Text.unchop = function(chopped) {
    return chopped.join(' ');
  }

  Text.setText('Your text goes here...');

  return Text;
}]);
