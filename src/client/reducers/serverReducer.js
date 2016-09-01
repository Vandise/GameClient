import * as messages from '../constants/messages/connectServer';

const initialState = {
  servers: {},
};

export default (state = initialState, action) => {
  if (action.type === messages.SET_ACTIVE_SERVERS) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};
