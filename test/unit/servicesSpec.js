'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  var scope;
  var defaultText = 'This is my text and this is how I expect it to work.';
  var defaultChop = defaultText.split(' ');

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

    it('should handle empty string appropriately', inject(function(Text) {
      Text.setText('');
      Text.current();
    }));

    it('should chop up as expected', inject(function(Text) {
      expect(Text.chopped).toEqual(defaultChop);
    }));

    it('should set the cursor to zero after the text changes', inject(function(Text) {
      expect(Text.cursor).toBe(0);
      Text.next();
      Text.setText('changing text');
      expect(Text.cursor).toBe(0);
    }))

    it('the map can be used to transverse the text and regain the original', inject(function(Text) {
      var part = [];
      var parts = [];
      var whole = '';
      var chopped = Text.chopped;
      var map = Text.chopMap;

      map.forEach(function(range) {
        part = chopped.slice(range.start, range.end + 1);
        parts.push(part.join(' '));
      });
      whole = parts.join(' ');

      expect(Text.original).toEqual(whole);
    }))

    it('should give me the current phrase', inject(function(Text) {
      var text = '';
      text = Text.current().join(' ');
      expect(text).toEqual('This is my text and this');
    }))

    it('should scroll and give me the next phase', inject(function(Text) {
      var text = '';
      Text.next();
      text = Text.current().join(' ');
      expect(text).toEqual('how I expect it to work.');
      expect(Text.cursor).toBe(1);
    }));

    it('should not scroll out of bounds', inject(function(Text) {
      var success = Text.scrollTo(-1);
      expect(success).toBeFalsy();

      var success = Text.scrollTo(Text.chopMap.length + 1);
      expect(success).toBeFalsy();
    }));

  });
});
