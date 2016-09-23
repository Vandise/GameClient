import debug from '../../../util/console';
import loginAttempt from './loginAttempt';

const events = [
  loginAttempt,
];

export default (socket, store, next, action) => (event, data) => {
  debug(`Receiving event ${event}`, data);
  return events.some((e) => {
    return e(event, data, store.dispatch);
  });
};
