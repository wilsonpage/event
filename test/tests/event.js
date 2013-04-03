

buster.testCase('Event()', {

	"Instantiating with no arguments should create a new events instance": function() {
		var emitter = new Event();

		assert.isTrue(emitter instanceof Event);
		assert.equals(emitter.on, Event.prototype.on);
		assert.equals(emitter.off, Event.prototype.off);
		assert.equals(emitter.fire, Event.prototype.fire);
	},

	"Instantiating with an argument should mixin events": function() {
		var object = {};

		Event(object);

		assert.equals(object.on, Event.prototype.on);
		assert.equals(object.off, Event.prototype.off);
		assert.equals(object.fire, Event.prototype.fire);
	},

	"Calling without `new` should still return a new instance": function() {
		var emitter = Event();

		assert.isTrue(emitter instanceof Event);
		assert.equals(emitter.on, Event.prototype.on);
		assert.equals(emitter.off, Event.prototype.off);
		assert.equals(emitter.fire, Event.prototype.fire);
	}
});