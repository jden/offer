# offer
attach cancelable event listeners


## installation

    $ npm install offer


## usage

Returns a convenient cancel function when registering an event listener:

```js
var offer = require('offer');
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

cancel = offer.once(e, 'fired', function () {})
cancel()

e.emit('fired', 'baz');
// no effect
```

We can also wrap an EventEmitter to return cancel functions every time:

```js
var emitter = offer(new EventEmitter())
var cancel = emitter.on('foo', function () {})
cancel()
```


## api

### `offer : (EventEmitter) => EventEmitter`

Wraps the EventEmitter. Now every call to `.on`, `.addListener`, or `.once` will be return cancel functions.

### `offer.on : (EventEmitter, event : String, listener: Function) => Function`

Returns a canceler function which takes no arguments. When that function is invoked, the listener is removed. If the listener has already been removed, calling the canceler has no effect, but will not produce an error.

### `offer.once : (EventEmitter, event : String, listener : Function) => Function`

Returns a canceler function which takes no arguments. When that function is invoked, the listener is removed. If it has already been removed (due to EventEmitter#once's behavior or by calling the canceler multiple times), calling this function has no effect, but will not produce an error.


## license
(c) MMXIII jden - Jason Denizac <jason@denizac.org> - http://jden.mit-license.org/MXIII