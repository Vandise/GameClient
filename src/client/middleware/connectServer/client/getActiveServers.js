import { GET_ACTIVE_SERVERS } from '../../../constants/messages/connectServer';
import * as modal from '../../../constants/messages/client';
import { displayModal } from '../../../actions/modalActions';
import debug from '../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Fetching active servers.');
  store.dispatch(displayModal(modal.FETCHING_SERVERS));
  socket.emit(action.type, action.payload);
};

export default {
  action: GET_ACTIVE_SERVERS,
  dispatch,
};
