import { LOGIN_ATTEMPT } from '../constants/messages/gameServer/login';

const initialState = {
  username: null,
};

export default (state = initialState, action) => {
  /*
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
  */
  return state;
};
