(function(e){if("function"==typeof bootstrap)bootstrap("event",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeEvent=e}else"undefined"!=typeof window?window.Event=e():global.Event=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){


function Event(obj) {
	if (!(this instanceof Event)) return new Event(obj);
	if (obj) {
		obj._cbs = {};
		return mixin(obj, Event.prototype);
	}

	this._cbs = {};
}


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
},{}]},{},[1])(1)
});
;