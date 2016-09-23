import { INIT_GAME } from '../constants/client';

const initialState = {
  client: null,
};

export default (state = initialState, action) => {
  if (action.type === INIT_GAME) {
    const Client = action.payload.gameClient;
    return Object.assign({}, state, {
      client: new Client(action.payload.user, action.payload.dispatch),
    });
  }
  return state;
};
