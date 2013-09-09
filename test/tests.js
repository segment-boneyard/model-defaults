describe('model-defaults', function () {
  var defaults = require('model-defaults')
    , assert = require('component-assert')
    , model = require('segmentio-model')
    , type = require('component-type');

  it('should work for values that are falsey', function(){
    var Ninja = model('Ninja')
      .use(defaults)
      .attr('weapons', { default: 0 });

    assert(0 == new Ninja().weapons());
  })

  it('should accept all defaults up front', function () {
    var Ninja = model('ninja')
      .use(defaults({
        weapons : 7,
        belt : 'black'
      }))
      .attr('weapons')
      .attr('belt');

    var ninja = new Ninja();
    assert(7 === ninja.weapons());
    assert('black' === ninja.belt());
  });

  it('should accept individual defaults', function () {
    var Pirate = model('pirate')
      .use(defaults)
      .attr('name', { default: 'Hook' })
      .attr('legs', { default: 1 });

    var pirate = new Pirate();
    assert('Hook' === pirate.name());
    assert(1 === pirate.legs());
  });

  it('should call functions', function () {
    var Person = model('person')
      .use(defaults)
      .attr('age', { default: function () { return 42; } });

    var person = new Person();
    assert(42 === person.age());
  });

  it('should call functions in the context of the model', function() {

    var Person = model('person')
      .use(defaults)
      .attr('age', { default: 42 })
      .attr('wrinkles', { default: function () { return this.age() * 2; }})

    var person = new Person();

    assert(84 === person.wrinkles());
  });

  it('should clone objects and arrays', function () {
    var array = [];
    var object = {};
    var Thing = model('thing')
      .use(defaults)
      .attr('array', { default: array })
      .attr('object', { default: object });

    var thing = new Thing();
    assert('object' === type(thing.object()));
    assert(object !== thing.object());
    assert('array' === type(thing.array()));
    assert(array !== thing.array());
  });

  it('should not clone objects returned from functions', function () {
    var obj = {};
    var Thing = model('thing')
      .use(defaults)
      .attr('custom', { default: function() {
        return obj;
      }});

    var thing = new Thing();
    assert('object' === type(thing.custom()));
    assert(obj === thing.custom());
  });
});
