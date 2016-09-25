export default class EventHandler {

  constructor(events = {}) {
    this.events = events;
    this.lastEvent = null;
  }

  bind(e, callback) {
    this.events[e] = callback;
  }

  emit(e, params) {
    if (this.events[e] != null) {
      this.events[e](...params);
      this.lastEvent = e;
      return true;
    }
    return false;
  }

}

