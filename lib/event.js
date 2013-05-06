
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
 * Creates a new event emitter
 * instance, or if passed an
 * object, mixes the event logic
 * into it.
 *
 * @param  {Object} obj
 * @return {Object}
 */
var Event = module.exports = function(obj) {
  if (!(this instanceof Event)) return new Event(obj);
  if (obj) return mixin(obj, Event.prototype);
};

/**
 * Registers a callback
 * with an event name.
 *
 * @param  {String}   name
 * @param  {Function} cb
 * @return {Event}
 */
Event.prototype.on = function(name, cb) {
  this._cbs = this._cbs || {};
  (this._cbs[name] || (this._cbs[name] = [])).unshift(cb);
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
Event.prototype.off = function(name, cb) {
  this._cbs = this._cbs || {};

  if (!name) return this._cbs = {};
  if (!cb) return delete this._cbs[name];

  var cbs = this._cbs[name] || [];
  var i;

  while (cbs && ~(i = cbs.indexOf(cb))) cbs.splice(i, 1);
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
Event.prototype.fire = function(options) {
  this._cbs = this._cbs || {};
  var name = options.name || name;
  var ctx = options.ctx || this;
  var cbs = this._cbs[name];

  if (cbs) {
    var args = [].slice.call(arguments, 1);
    var l = cbs.length;
    while (l--) cbs[l].apply(ctx, args);
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