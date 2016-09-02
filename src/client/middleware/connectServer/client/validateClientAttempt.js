import
  { VALIDATE_CLIENT_ATTEMPT } from '../../../constants/messages/connectServer';
import * as modal from '../../../constants/messages/client';
import { displayModal } from '../../../actions/modalActions';
import debug from '../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Validating client.');
  store.dispatch(displayModal(modal.CONNECTING_GS));
  socket.emit(action.type, action.payload);
};

export default {
  action: VALIDATE_CLIENT_ATTEMPT,
  dispatch,
};
