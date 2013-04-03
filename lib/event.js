

function Event(obj) {
	if (!(this instanceof Event)) return new Event(obj);
	if (obj) {
		obj._cbs = {};
		return mixin(obj, Event.prototype);
	}

	this._cbs = {};
}


Event.prototype.on = function(name, callback) {
	var list = this._cbs[name] || (this._cbs[name] = []);
	list.push(callback);
};


Event.prototype.off = function(name, cb) {
	var index;

	if (!name) return this._cbs = {};
	if (!cb) return delete this._cbs[name];

	var cbs = this._cbs[name] || [];
	while (cbs && ~(index = cbs.indexOf(cb))) cbs.splice(index, 1);
};


Event.prototype.fire = function(name) {
	var cbs = this._cbs[name] || [];
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