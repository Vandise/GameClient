import serverError from './serverError';
import setActiveServers from './getActiveServers';
import validateClientAttempt from './validateClientAttempt';
import debug from '../../../util/console';

const events = [
  serverError,
  setActiveServers,
  validateClientAttempt,
];

export default (socket, store, next, action) => (event, data) => {
  debug(`Receiving event ${event}`, data);
  return events.some((e) => {
    return e(event, data, store.dispatch);
  });
};
