var offer = require('./index');
var EventEmitter = require('events').EventEmitter;

var e = new EventEmitter()

var cancel = offer.on(e, 'fired', function (val) {
  console.log(val + 'bar');
});

e.emit('fired', 'foo');
// => foobar

cancel();

e.emit('fired', 'baz');
// no effect