# model-defaults

  Lets a model specify default attribute values.

## Installation

    $ component install segmentio/model-defaults
    $ npm install model-defaults

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
