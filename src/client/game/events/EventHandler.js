import debug from '../../util/console';

export default class EventHandler {

  constructor(events = {}, client = null) {
    this.events = events;
    this.client = client;
    this.lastEvent = null;
  }

  bind(e, callback) {
    this.events[e] = callback;
  }

  emit(e, params) {
    debug('Emitting event', e, params);
    if (this.events[e] != null) {
      this.events[e](...params);
      this.lastEvent = e;
      return true;
    }
    return false;
  }

}

