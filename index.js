
var clone = require('clone')
  , each = require('each')
  , type = require('type');


/**
 * Plugin.
 *
 * @param {Function|Object} values  The default values dictionary or the Model.
 */

module.exports = function (values) {
  if ('object' === type(values)) {
    return function (Model) {
      bind(Model, values);
    };
  } else {
    return bind(values);
  }
};


/**
 * Bind to the model's construct event.
 *
 * @param {Function} Model  The model constructor.
 */

function bind (Model, defaults) {
  defaults || (defaults = {});
  Model.on('construct', function (model, attrs) {
    each(Model.attrs, function (key, options) {
      var value = undefined != options.default
        ? options.default
        : defaults[key];

      if (value !== undefined) apply(model, key, value);
    });
  });
}


/**
 * Default a `model` with a `value` for a `key` if it doesn't exist. Use a clone
 * of the value, so that they it's easy to declare objects and arrays without
 * worrying about copying by reference.
 *
 * @param {Model}          model  The model.
 * @param {String}         key    The key to back by a default.
 * @param {Mixed|Function} value  The default value to use.
 */

function apply (model, key, value) {
  if ('function' === type(value)) value = value.call(model);
  if (!model.attrs[key]) model.attrs[key] = clone(value);
}
