import { getActiveServers } from '../../../actions/connectServerActions';
import debug from '../../../util/console';

const action = 'connect';
const dispatch = (store, next, action) => (socket) => {
  debug('Client connected, fetching active servers.');
  store.dispatch(getActiveServers());
};

export default {
  action,
  dispatch,
};
