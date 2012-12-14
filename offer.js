function wrap(innerFunction) {
  return function wrapped() {
    var args = Array.prototype.slice.call(arguments);
    innerFunction.apply(this, args);
  };
}

module.exports = function offer(eventEmitter, event, listener) {
  var uniquelistener = wrap(listener);

  eventEmitter.on(event, uniquelistener);

  return function () {
    eventEmitter.removeListener(event, uniquelistener);
  };
};

module.exports.once = function once(eventEmitter, event, listener) {
  var uniquelistener = wrap(listener);

  eventEmitter.once(event, uniquelistener);

  return function () {
    eventEmitter.removeListener(event, uniquelistener);
  };
};