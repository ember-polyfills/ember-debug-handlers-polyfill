# ember-debug-handlers-polyfill

This addon provides an implementation of [emberjs/rfcs#65](https://github.com/emberjs/rfcs/blob/master/text/0065-deprecation-warning-handlers.md) (added to Ember in [emberjs/ember.js#11833](https://github.com/emberjs/ember.js/pull/11833) and released in Ember v2.1.0) that can be used with versions of Ember prior to v2.1.0.

This polyfill will be useful for other tooling related addons or app developers that want to add custom deprecation handlers.

## Contributing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-debug-handlers-polyfill`
* `yarn install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
