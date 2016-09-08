import debug from '../../../util/console';

const events = [

];

export default (socket, store, next, action) => (event, data) => {
  debug(`Receiving event ${event}`, data);
  return events.some((e) => {
    return e(event, data, store.dispatch);
  });
};
