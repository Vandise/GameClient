import actions from '../../../../constants/messages/gameServer';
import debug from '../../../../util/console';

const dispatch = (socket, store, action) => {
  debug('Logging In.', action.payload);
  socket.emit(action.type, action.payload);
};

export default {
  action: actions.FETCH_CHARACTERS,
  dispatch,
};
