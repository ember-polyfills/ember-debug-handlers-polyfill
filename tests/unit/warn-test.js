import { warn } from '@ember/debug';
import { registerWarnHandler } from '@ember/debug';
import { module, test } from 'qunit';
import getHandlers from '../helpers/get-handlers';

const HANDLERS = getHandlers();

let originalWarnHandler;

module('ember-debug', function(hooks) {
  hooks.beforeEach(function() {
    originalWarnHandler = HANDLERS.warn;
  });

  hooks.afterEach(function() {
    HANDLERS.warn = originalWarnHandler;
  });

  test('Ember.warn does not throw', function(assert) {
    assert.expect(1);

    try {
      warn('Should not throw', false, { id: 'test' });
      assert.ok(true, 'Ember.warn did not throw');
    } catch(e) {
      assert.ok(false, `Expected Ember.warn not to throw but it did: ${e.message}`);
    }
  });

  test('Ember.warn calls warn handler if second argument is falsy', function(assert) {
    assert.expect(6);

    registerWarnHandler(function(message, options, next) {
      assert.ok(message, 'Reactor core temperature critical');
      assert.deepEqual(options, { id: 'test', until: 'forever' });
      next(message, options);
    });

    warn('Reactor core temperature critical', false, { id: 'test', until: 'forever' });
    warn('Reactor core temperature critical', '', { id: 'test', until: 'forever' });
    warn('Reactor core temperature critical', 0, { id: 'test', until: 'forever' });
  });

  test('Ember.warn does not call warn handler if second argument is truthy', function(assert) {
    assert.expect(1);

    registerWarnHandler(function(message, options, next) {
      assert.ok(false);
      next(message, options);
    });

    warn('Reactor core temperature critical', true, { id: 'test', until: 'forever' });
    warn('Reactor core temperature critical', '1', { id: 'test', until: 'forever' });
    warn('Reactor core temperature critical', 1, { id: 'test', until: 'forever' });

    assert.ok(true, 'deprecations were not thrown');
  });
});
