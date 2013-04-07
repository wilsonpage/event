
buster.testCase('Event#off()', {

  "Should remove callback when passed": function() {
    var emitter = new Event();
    var callback = function(){};
    var name = 'eventname';

    emitter.on(name, callback);
    emitter.off(name, callback);

    assert.equals(emitter._cbs[name].indexOf(callback), -1);
  },

  "Should remove multiple instances of the same callback": function() {
    var emitter = new Event();
    var callback = function(){};
    var name = 'eventname';

    emitter.on(name, callback);
    emitter.on(name, callback);
    emitter.off(name, callback);

    assert.isTrue(emitter._cbs[name].indexOf(callback) < 0);
  },

  "Should remove all callbacks under name when no callback is defined": function() {
    var name = 'eventname';
    var callback1 = function(){};
    var callback2 = function(){};
    var emitter = new Event();

    emitter.on(name, callback1);
    emitter.on(name, callback2);
    emitter.off(name);

    refute.defined(emitter._cbs[name]);
  },

  "Should be chainable": function() {
    var emitter = new Event();
    var callback = this.spy();
    var callback2 = this.spy();

    emitter
      .on('eventname', callback)
      .on('eventname2', callback2);

    emitter
      .off('eventname', callback)
      .off('eventname2', callback2);

    emitter
      .fire('eventname')
      .fire('eventname2');

    assert.isFalse(callback.called);
    assert.isFalse(callback2.called);
  }
});