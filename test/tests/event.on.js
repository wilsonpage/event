


buster.testCase('Event#on()', {
  setUp: function(){},


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

  tearDown: function(){}
});