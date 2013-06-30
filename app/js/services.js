'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('tweed.services', []).value('version', '0.1');

// User model
app.factory('Text', [function() {

  var Text = {};

  Text.original = '';
  Text.chopped = [];
  Text.cursor = 0;

  Text.setText = function TextSetText(text) {
    Text.original = text;
    Text.chopped = text.split(' ');
    Text.chopMap = Text.createChopMap(Text.chopped);
  }

  /**
   * Creates a list of indexes of an array of strings, that denote different length phrases of the choppedText
   * @param {array} text An array of strings to be mapped
   * @return {array} [description]
   */
  Text.createChopMap = function TextCreateChopMap(choppedText) {
    var map = [],
        bucket = [],
        last = 0,
        groupSize = 6; // TODO: determine best size

    choppedText.forEach(function(item, index) {
      // Put items in the bucket until it grows to the max size
      bucket.push(item);

      // When its full, empty bucket and add that range to the bucket
      if (bucket.length > groupSize) {
        map.push({start: last, end: index})
        bucket = [];
        last = index + 1;
      }
    });

    // Clean the last bucket
    map.push({start: last, end: choppedText.length});

    return map;
  };

  return Text;
}]);
