module.exports = function (eventEmitter) {
  return {
    __proto__: eventEmitter.__proto__,
    on: on.bind(eventEmitter, eventEmitter),
    addListener: on.bind(eventEmitter, eventEmitter),
    once: once.bind(eventEmitter, eventEmitter)
  }
}

var on = module.exports.on = function offer(eventEmitter, event, listener) {

  var uniquelistener = unique(listener)

  eventEmitter.on(event, uniquelistener)

  return function () {
    eventEmitter.removeListener(event, uniquelistener)
  }
}

var once = module.exports.once = function once(eventEmitter, event, listener) {
  var uniquelistener = unique(listener)

  eventEmitter.once(event, uniquelistener)

  return function () {
    eventEmitter.removeListener(event, uniquelistener)
  }
}

// get a unique instance of a function
// such that unique(fn) !== fn
function unique(fn) {
  function wrapped() {
    return fn.apply(this, arguments)
  }
  if (fn.name) { wrapped.name = fn.name }
  return wrapped
}
