'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  var scope;
  var defaultText = '0 1 2 3 4 5 6 7 8 9. 00 11 22 33 44 55 66 77 88 99. 111 222 333 444 555 666 777 888 999.';
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

      expect(Text.saved).toEqual(whole);
    }))

    it('should give me the current phrase', inject(function(Text) {
      var text = '';
      text = Text.current().join(' ');
      expect(text).toEqual('0 1 2 3 4 5');
    }))

    it('should scroll and give me the next phase', inject(function(Text) {
      var text = '';
      Text.next();
      text = Text.current().join(' ');
      expect(text).toEqual('7 8 9. 00 11 22');
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
