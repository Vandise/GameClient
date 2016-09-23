import actions from '../../../../constants/messages/gameServer';
import * as modal from '../../../../constants/messages/client';
import { displayModal } from '../../../../actions/modalActions';
import debug from '../../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Logging In.', action.data);
  let data = [];
  data.push({ name: 'username', value: action.data.username });
  data.push({ name: 'password', value: action.data.password });
  store.dispatch(displayModal(modal.LOGIN_ATTEMPT));
  socket.emit(action.type, data);
};

export default {
  action: actions.LOGIN_ATTEMPT,
  dispatch,
};
