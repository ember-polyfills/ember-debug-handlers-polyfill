# ember-deprecation-warning-handlers-polyfill

This addon provides an implementation of [emberjs/rfcs#65](https://github.com/emberjs/rfcs/blob/master/text/0065-deprecation-warning-handlers.md) (added to Ember in [emberjs/ember.js#11833](https://github.com/emberjs/ember.js/pull/11833)) that can be used with versions of Ember prior to 2.1.0 (or whenever the `ember-debug-handlers` feature is enabled).

This polyfill will be useful for other tooling related addons or app developers that want to add custom deprecation handlers.

## Contributing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
