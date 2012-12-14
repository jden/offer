# offer
attach cancelable event listeners


## installation

    $ npm install offer


## usage

    var offer = require('./offer');
    var EventEmitter = require('events').EventEmitter;

    var e = new EventEmitter()

    var cancel = offer(e, 'fired', function (val) {
      console.log(val + 'bar');
    });

    e.emit('fired', 'foo');
    // => foobar

    cancel();

    e.emit('fired', 'baz');
    // no effect


## api

    offer(eventEmitter, event, listener)

Returns a canceler function which takes no arguments. When that function is invoked, the listener is removed. If the listener has already been removed, calling the canceler has no effect, but will not produce an error.

    offer.once(eventEmitter, event, listener)

Returns a canceler function which takes no arguments. When that function is invoked, the listener is removed. If it has already been removed (due to EventEmitter#once's behavior or by calling the canceler multiple times), calling this function has no effect, but will not produce an error.


## todo
- write test suite
- test with backbone events
- promiscuous function to add it to EventEmitter prototype `on` and `once`


## license
(c) 2012 jden - Jason Denizac <jason@denizac.org> - http://jden.mit-license.org/2012