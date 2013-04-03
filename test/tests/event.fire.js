
buster.testCase('Event#fire()', {

  "Should fire all callbacks registered under the name": function() {
    var emitter = new Event();
    var callback1 = this.spy();
    var callback2 = this.spy();
    var name = 'eventname';

    emitter.on(name, callback1);
    emitter.on(name, callback2);

    emitter.fire(name);

    assert.called(callback1);
    assert.called(callback2);
  },

  "The callback should receive the arguments that the event was fired with": function() {
    var emitter = new Event();
    var callback = this.spy();
    var name = 'eventname';
    var arg1 = 'foo';
    var arg2 = 'bar';

    emitter.on(name, callback);
    emitter.fire(name, arg1, arg2);

    assert.isTrue(callback.calledWith(arg1, arg2));
  }
});