
/**
 * Event
 *
 * A super lightweight
 * event emitter library.
 *
 * @version 0.1.4
 * @author Wilson Page <wilson.page@me.com>
 */

/**
 * Locals
 */

var proto = Event.prototype;
var slice = [].slice;

/**
 * Expose `Event`
 */

module.exports = Event;

/**
 * Creates a new event emitter
 * instance, or if passed an
 * object, mixes the event logic
 * into it.
 *
 * @param  {Object} obj
 * @return {Object}
 */
function Event(obj) {
  if (!(this instanceof Event)) return new Event(obj);
  if (obj) return mixin(obj, proto);
}

/**
 * Registers a callback
 * with an event name.
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {Event}
 */
proto.on = function(name, fn, ctx) {
  this._cbs = this._cbs || {};

  var namespace = this._cbs[name];

  // Create a new namespace
  // if once does not exist
  // for this event name
  if (!namespace) {
    namespace = this._cbs[name] = {
      callbacks: [],
      contexts: []
    };
  }

  // Push a function and a
  // corresponding context
  // into each list.
  namespace.callbacks.unshift(fn);
  namespace.contexts.unshift(ctx);

  return this;
};

/**
 * Removes a single callback,
 * or all callbacks associated
 * with the passed event name.
 *
 * @param  {String}   name
 * @param  {Function} cb
 * @return {Event}
 */
proto.off = function(name, callback, ctx) {
  this._cbs = this._cbs || {};

  // Clear references to all callbacks
  // if no function is passed.
  if (!name) {
    this._cbs = {};
    return;
  }

  // If no function has been passed
  // remove all callbacks for the
  // passed event name.
  if (!callback) {
    delete this._cbs[name];
    return;
  }

  var namespace = this._cbs[name] || {};
  var callbacks = namespace.callbacks || [];
  var contexts = namespace.contexts || [];
  var i;

  // Loop over each callback that
  // matches the given function
  while (~(i = callbacks.indexOf(callback))) {

    // If a context has been given
    // and this current context doesn't
    // match the given context, we should
    // not remove this callback.
    if (ctx && contexts[i] !== ctx) continue;

    // Remove the callback
    // and the context from
    // each of the lists
    callbacks.splice(i, 1);
    contexts.splice(i, 1);
  }

  return this;
};

/**
 * Fires an event. Which triggers
 * all callbacks registered on this
 * event name.
 *
 * @param  {String} name
 * @return {Event}
 */
proto.fire = function(name) {
  this._cbs = this._cbs || {};

  var namespace = this._cbs[name] || {};

  // IMPORTANT: We clone each of
  // the lists here, so that if a
  // callback mutates the canonical
  // callback list, it will not affect
  // the events called in this flush.
  var callbacks = slice.call(namespace.callbacks || []);
  var contexts = slice.call(namespace.contexts || []);

  // No point carrying on
  // if no callbacks found
  if (!callbacks.length) return this;

  var args = slice.call(arguments, 1);
  var l = callbacks.length;

  while (l--) {
    callbacks[l].apply(contexts[l], args);
  }

  return this;
};

/**
 * Util
 */

/**
 * Mixes in the properties
 * of the second object into
 * the first.
 *
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function mixin(a, b) {
  for (var key in b) a[key] = b[key];
  return a;
}