var assert = require('assert');

describe('require-shield({mode: \'black-list\'})', function() {
  var shield = require('../index.js')({mode: 'black-list'});
  describe('#except(\'^glob|diff$\', \'blacklist.js$\')', function() {
    shield.except('^glob|diff$', 'blacklist.js$');
    it('should prevent loading the \'glob\' module from the \'blacklist.js\' module', function() {
      try {
        assert.throws(() => {
            require('glob');
        }, /Mode: black-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
    it('should prevent loading the \'diff\' module from the \'blacklist.js\' module', function() {
      try {
        assert.throws(() => {
            require('diff');
        }, /Mode: black-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
    it('should allow loading the \'fs\' module from the \'blacklist.js\' module', function() {
      try {
        assert.doesNotThrow(() => {
            require('fs');
        }, /Mode: black-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
  });
  
});