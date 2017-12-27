import { deprecate } from '@ember/application/deprecations';
import { registerDeprecationHandler } from '@ember/debug';
import Ember from 'ember';
import { module, test, skip } from 'qunit';
import getHandlers from '../helpers/get-handlers';

const HANDLERS = getHandlers();

let originalEnvValue;
let originalDeprecateHandler;

module('ember-debug', {
  beforeEach() {
    originalEnvValue = Ember.ENV.RAISE_ON_DEPRECATION;
    originalDeprecateHandler = HANDLERS.deprecate;

    Ember.ENV.RAISE_ON_DEPRECATION = true;
  },

  afterEach() {
    HANDLERS.deprecate = originalDeprecateHandler;

    Ember.ENV.RAISE_ON_DEPRECATION = originalEnvValue;
  }
});

test('Ember.deprecate does not throw if RAISE_ON_DEPRECATION is false', function(assert) {
  assert.expect(1);

  Ember.ENV.RAISE_ON_DEPRECATION = false;

  try {
    deprecate('Should not throw', false, { id: 'test', until: 'forever' });
    assert.ok(true, 'Ember.deprecate did not throw');
  } catch(e) {
    assert.ok(false, `Expected Ember.deprecate not to throw but it did: ${e.message}`);
  }
});

test('Ember.deprecate re-sets deprecation level to RAISE if ENV.RAISE_ON_DEPRECATION is set', function(assert) {
  assert.expect(2);

  Ember.ENV.RAISE_ON_DEPRECATION = false;

  try {
    deprecate('Should not throw', false, { id: 'test', until: 'forever' });
    assert.ok(true, 'Ember.deprecate did not throw');
  } catch(e) {
    assert.ok(false, `Expected Ember.deprecate not to throw but it did: ${e.message}`);
  }

  Ember.ENV.RAISE_ON_DEPRECATION = true;

  assert.throws(function() {
    deprecate('Should throw', false, { id: 'test', until: 'forever' });
  }, /Should throw/);
});

test('When ENV.RAISE_ON_DEPRECATION is true, it is still possible to silence a deprecation by id', function(assert) {
  assert.expect(3);

  Ember.ENV.RAISE_ON_DEPRECATION = true;
  registerDeprecationHandler(function(message, options, next) {
    if (!options || options.id !== 'my-deprecation') {
      next(...arguments);
    }
  });

  try {
    deprecate('should be silenced with matching id', false, { id: 'my-deprecation', until: 'forever' });
    assert.ok(true, 'Did not throw when level is set by id');
  } catch(e) {
    assert.ok(false, `Expected Ember.deprecate not to throw but it did: ${e.message}`);
  }

  assert.throws(function() {
    deprecate('Should throw with no matching id', false, { id: 'test', until: 'forever' });
  }, /Should throw with no matching id/);

  assert.throws(function() {
    deprecate('Should throw with non-matching id', false, { id: 'other-id', until: 'forever' });
  }, /Should throw with non-matching id/);
});

test('Ember.deprecate throws deprecation if second argument is falsy', function(assert) {
  assert.expect(3);

  assert.throws(function() {
    deprecate('Deprecation is thrown', false, { id: 'test', until: 'forever' });
  });

  assert.throws(function() {
    deprecate('Deprecation is thrown', '', { id: 'test', until: 'forever' });
  });

  assert.throws(function() {
    deprecate('Deprecation is thrown', 0, { id: 'test', until: 'forever' });
  });
});

test('Ember.deprecate does not throw deprecation if second argument is a function and it returns true', function(assert) {
  assert.expect(1);

  deprecate('Deprecation is thrown', function() {
    return true;
  }, { id: 'test', until: 'forever' });

  assert.ok(true, 'deprecation was not thrown');
});

skip('Ember.deprecate throws if second argument is a function and it returns false', function(assert) {
  assert.expect(1);
  assert.throws(function() {
    deprecate('Deprecation is thrown', function() {
      return false;
    }, { id: 'test', until: 'forever' });
  });
});

test('Ember.deprecate does not throw deprecations if second argument is truthy', function(assert) {
  assert.expect(1);

  deprecate('Deprecation is thrown', true, { id: 'test', until: 'forever' });
  deprecate('Deprecation is thrown', '1', { id: 'test', until: 'forever' });
  deprecate('Deprecation is thrown', 1, { id: 'test', until: 'forever' });

  assert.ok(true, 'deprecations were not thrown');
});

test('Ember.assert throws if second argument is falsy', function(assert) {
  assert.expect(3);

  assert.throws(function() {
    assert('Assertion is thrown', false);
  });

  assert.throws(function() {
    assert('Assertion is thrown', '');
  });

  assert.throws(function() {
    assert('Assertion is thrown', 0);
  });
});

test('Ember.deprecate does not throw a deprecation at log and silence levels', function(assert) {
  assert.expect(4);
  let id = 'ABC';
  let until = 'forever';
  let shouldThrow = false;

  registerDeprecationHandler(function(message, options) {
    if (options && options.id === id) {
      if (shouldThrow) {
        throw new Error(message);
      }
    }
  });

  try {
    deprecate('Deprecation for testing purposes', false, { id, until });
    assert.ok(true, 'Deprecation did not throw');
  } catch(e) {
    assert.ok(false, 'Deprecation was thrown despite being added to blacklist');
  }

  try {
    deprecate('Deprecation for testing purposes', false, { id, until });
    assert.ok(true, 'Deprecation did not throw');
  } catch(e) {
    assert.ok(false, 'Deprecation was thrown despite being added to blacklist');
  }

  shouldThrow = true;

  assert.throws(function() {
    deprecate('Deprecation is thrown', false, { id, until });
  });



  assert.throws(function() {
    deprecate('Deprecation is thrown', false, { id, until });
  });
});
