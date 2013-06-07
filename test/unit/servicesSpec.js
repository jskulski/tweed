'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  var scope
    , defaultText = 'This is my text and this is how I expect it to work.'
    ;

  beforeEach(module('tweed.services'));

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('Text', function() {

    it('should chop and unchop should be inverses', inject(function(Text) {
      var chopped = Text.chop(defaultText)
        , unchopped = Text.unchop(chopped)
        ;

      expect(unchopped).toEqual(defaultText);

    }));

    it('should keep edited in sync when original changes', inject(function(Text) {
      Text.setText(defaultText);
      expect(Text.unchop(Text.edited)).toEqual(Text.original);
      // expect(Text.edited).toEqual(defaultText);
    }));

    it('should move the cursor to the next set of words', inject(function(Text) {
      console.log(Text);
      //expect(true).toEqual(false);
    }));

  });
});
