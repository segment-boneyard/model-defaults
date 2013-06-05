# model-defaults

  Lets a model specify default attribute values.

  _Note: for right now this only works with [`segmentio/model`](https://github.com/segmentio/model) until [`component/model`](https://github.com/component/model) merges in [#38](https://github.com/component/model/pull/38)._

## Installation

    $ component install segmentio/model-defaults

## API

```js
var defaults = require('model-defaults')
  , model = require('model');

// all specified up front
var person = model('person')
  .use(defaults({
    name: '',
    age: 0
  }))
  .attr('name')
  .attr('age');

// or specified individually
var person = model
  .use(defaults)
  .attr('name', { default: '' })
  .attr('age', { default: 0 });
```

## License

  MIT
