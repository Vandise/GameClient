import { GET_ACTIVE_SERVERS } from '../../../constants/messages/connectServer';
import debug from '../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Fetching active servers.');
  socket.emit(action.type, action.payload);
};

export default {
  action: GET_ACTIVE_SERVERS,
  dispatch,
};
