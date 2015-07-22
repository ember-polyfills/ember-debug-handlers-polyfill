/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-deprecation-warning-handlers-polyfill',

  included: function() {
    var app = this.app;

    if (app.env !== 'production') {
      app.import('vendor/ember-deprecation-warning-handlers-polyfill/debug.js');
    } else {
      app.import('vendor/ember-deprecation-warning-handlers-polyfill/prod.js');
    }
  }
};
