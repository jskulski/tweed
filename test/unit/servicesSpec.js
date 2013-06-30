'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  var scope,
      defaultText = 'This is my text and this is how I expect it to work.',
      defaultChop = defaultText.split(' ');

  beforeEach(module('tweed.services'));

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('Text', function() {

    beforeEach(inject(function(Text) {
      Text.setText(defaultText);
    }));

    it('should chop up as expected', inject(function(Text) {
      expect(Text.chopped).toEqual(defaultChop);
    }));

    it('the map can be used to transverse the text and regain the original', inject(function(Text) {
      var part = [],
          parts = [],
          whole = '',
          chopped = Text.chopped,
          map = Text.chopMap;

      map.forEach(function(range) {
        part = chopped.slice(range.start, range.end + 1);
        parts.push(part.join(' '));
      });
      console.log(parts);
      whole = parts.join(' ');

      expect(Text.original).toEqual(whole);
    }));


  });
});
