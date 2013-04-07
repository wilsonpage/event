


buster.testCase('Event#on()', {

  "Should store the callback function in the callbacks object": function() {
    var emitter = new Event();
    var callback = function(){};

    emitter.on('eventname', callback);

    assert.equals(emitter._cbs['eventname'][0], callback);
  },

  "Should store more than one callback under the same name": function() {
    var name = 'eventname';
    var callback1 = function(){};
    var callback2 = function(){};
    var emitter = new Event();

    emitter.on(name, callback1);
    emitter.on(name, callback2);

    assert.equals(emitter._cbs[name].length, 2);
    assert.equals(emitter._cbs[name][0], callback1);
    assert.equals(emitter._cbs[name][1], callback2);
  },

  "Should be chainable": function() {
    var emitter = new Event();
    var callback = this.spy();
    var callback2 = this.spy();
    var callback3 = this.spy();

    emitter
      .on('eventname', callback)
      .on('eventname', callback2)
      .on('eventname2', callback3);

    emitter.fire('eventname');
    emitter.fire('eventname2');

    assert.called(callback);
    assert.called(callback2);
    assert.called(callback3);
  }
});