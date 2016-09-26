import debug from '../../../util/console';
import loginAttempt from './loginAttempt';
import fetchCharacters from './characterMenu/fetchCharacters';

const events = [
  loginAttempt,
  fetchCharacters,
];

export default (socket, store, next, action) => (event, data) => {
  debug(`Receiving event ${event}`, data);
  return events.some((e) => {
    return e(event, data, store.dispatch, store);
  });
};
