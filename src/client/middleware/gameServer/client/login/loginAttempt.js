import { LOGIN_ATTEMPT } from '../../../../constants/messages/gameServer';
import * as modal from '../../../../constants/messages/client';
import { displayModal } from '../../../../actions/modalActions';
import debug from '../../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Logging In.');
  store.dispatch(displayModal(modal.LOGIN_ATTEMPT));
  socket.emit(action.type, action.payload);
};

export default {
  action: LOGIN_ATTEMPT,
  dispatch,
};
