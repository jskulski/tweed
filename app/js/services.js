'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('tweed.services', []).value('version', '0.1');

// User model
app.factory('Text', [function() {

  var Text = {};

  Text.inEditor = '';
  Text.saved = '';
  Text.chopped = [];
  Text.cursor = 0;

  Text.setText = function TextSetText(text) {
    Text.cursor = 0;
    Text.saved = text;
    Text.chopped = text.split(' ');
    Text.chopMap = Text.createChopMap(Text.chopped);
  }

  /**
   * Creates a list of indexes of an array of strings, that denote different length phrases of the choppedText
   * @param {array} text An array of strings to be mapped
   * @return {array} [description]
   */
  Text.createChopMap = function TextCreateChopMap(choppedText) {
    var map = [];
    var last = 0;
    var bucket = [];
    var bucketSize = 6; // TODO: user input

    choppedText.forEach(function(item, index) {
      // Put items in the bucket until it grows to the max size
      bucket.push(item);

      // When its full, empty bucket and add that range to the bucket
      if (bucket.length > bucketSize) {
        map.push({start: last, end: index})
        bucket = [];
        last = index + 1;
      }
    });

    // Clean the last bucket
    map.push({start: last, end: choppedText.length});

    return map;
  };

  /**
   * Safely scrolls to a specific phrase
   * @param {integer} pos Position of phrase to scroll to
   * @returns {boolean} unless you are out of bounds
   */
  Text.scrollTo = function TextScrollTo(phrase) {
    var inBounds = (phrase >= 0 && phrase < Text.chopMap.length);
    if (inBounds) {
      Text.cursor = phrase;
      return true;
    }
    else {
      return false;
    }
  };

  /**
   * Moves cursor forward
   * @returns Text true unless you are at the last phrase
   */
  Text.next = function TextNext() {
    return Text.scrollTo(Text.cursor + 1);
  };

  /**
   * Moves cursor backwards
   * @returns {boolean} true unless you are the first phrase
   */
  Text.prev = function TextPrev() {
    return Text.scrollTo(Text.cursor - 1);
  };

  /**
   * Gets the current text phrase
   * @returns {array} The phrase as an array of words
   */
  Text.current = function TextGetCurrent() {
    var range = Text.chopMap[Text.cursor];
    var current = Text.chopped.slice(range.start, range.end);
    return current;
  };

  return Text;
}]);
