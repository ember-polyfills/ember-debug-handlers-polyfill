import Ember from 'ember';

export default function() {
  if (Ember.__loader.registry['ember-debug/handlers']) {
    return Ember.__loader.require('ember-debug/handlers').HANDLERS;
  } else {
    return Ember.Debug._____HANDLERS__DO__NOT__USE__SERIOUSLY__I_WILL_BE_MAD;
  }
}
