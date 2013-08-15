var chai = require('chai')
chai.should()
var EventEmitter = require('events').EventEmitter

describe('offer', function () {
  var offer = require('../index')

  it('wraps an EventEmitter', function () {
    var emitter = new EventEmitter()
    emitter.on.should.equal(EventEmitter.prototype.on)
    var emitter2 = offer(emitter)
    emitter2.on.should.not.equal(EventEmitter.prototype.on)
    emitter2.once.should.not.equal(EventEmitter.prototype.once)
    emitter2.addListener.should.not.equal(EventEmitter.prototype.addListener)
    emitter2.should.not.equal(emitter)
  })

  it('.on returns a function to remove the listener', function () {
    var emitter = new EventEmitter()
    var cancel = offer.on(emitter, 'foo', function () {})

    cancel.should.be.a('function')

    emitter._events.should.have.property('foo')

    cancel()

    emitter._events.should.not.have.property('foo')
  })

    it('.once returns a function to remove the listener', function () {
    var emitter = new EventEmitter()
    var cancel = offer.once(emitter, 'foo', function () {})

    cancel.should.be.a('function')

    emitter._events.should.have.property('foo')

    cancel()

    emitter._events.should.not.have.property('foo')
  })

  it('.once\'s return fn does nothing if event already emitted', function () {
    var emitter = new EventEmitter()
    var cancel = offer.once(emitter, 'foo', function () {})

    cancel.should.be.a('function')

    emitter._events.should.have.property('foo')

    emitter.emit('foo')

    emitter._events.should.not.have.property('foo')

    cancel()

    emitter._events.should.not.have.property('foo')
  })
})