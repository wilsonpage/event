

var Event = module.exports = function(obj) {
	if (!(this instanceof Event)) return new Event(obj);
	if (obj) {
		obj._cbs = {};
		return mixin(obj, Event.prototype);
	}

	this._cbs = {};
};


Event.prototype.on = function(name, cb) {
	(this._cbs[name] || (this._cbs[name] = [])).push(cb);
};


Event.prototype.off = function(name, cb) {
	var i, cbs;

	if (!name) return this._cbs = {};
	if (!cb) return delete this._cbs[name];

	cbs = this._cbs[name] || [];

	while (cbs && ~(i = cbs.indexOf(cb))) cbs.splice(i, 1);
};


Event.prototype.fire = function(name) {
	var cbs = (this._cbs[name] || (this._cbs[name] = []));
	var args = [].slice.call(arguments, 1);
	var l = cbs.length;

	while (l--) cbs[l].apply(null, args);
};

/**
 * Util
 */

function mixin(a, b) {
  for (var key in b) a[key] = b[key];
  return a;
}