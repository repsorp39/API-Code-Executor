var assert = require('assert');

describe('require-shield({mode: \'white-list\'})', function() {
  var shield = require('../index.js')({mode: 'white-list'});
  describe('#except(\'^glob|diff$\', \'whitelist.js$\')', function() {
    shield.except('^glob|diff$', 'whitelist.js$');
    it('should allow loading the \'glob\' module from the \'whitelist.js\' module', function() {
      try {
        assert.doesNotThrow(() => {
            require('glob');
        }, /Mode: white-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
    it('should allow loading the \'diff\' module from the \'whitelist.js\' module', function() {
      try {
        assert.doesNotThrow(() => {
            require('diff');
        }, /Mode: white-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
    it('should prevent loading the \'fs\' module from the \'whitelist.js\' module', function() {
      try {
        assert.throw(() => {
            require('fs');
        }, /Mode: white-list/);
      } catch (error) {
        // Only throw on assertion error
        if(error.name === 'AssertionError') {
          throw(error);
        }
      }
    });
  });
  
});