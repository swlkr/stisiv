function emitter(obj) {
  var events = {};

  if (!obj) {
    obj = {};
  }

  obj.on = function(type, listener) {
    if (!events[type]) {
      events[type] = [listener];
    } else {
      events[type].push(listener);
    }
  };

  obj.emit = function(type) {
    var evt = events[type];

    if (!evt) { return; }

    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < evt.length; i++) {
      evt[i].apply(obj, args);
    }
  };

  obj.emit = function(type) {
    var evt = events[type];
    if (!evt) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < evt.length; i++) {
      debounce(evt[i]);
    }
    function debounce(e) {
      setTimeout(function() {
        e.apply(obj, args);
      }, 0);
    }
  };

  return obj;
}

module.exports = emitter;
