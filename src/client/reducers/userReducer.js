import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS
} from '../constants/messages/gameServer/login';

const initialState = {
  username: null,
};

export default (state = initialState, action) => {
  if (action.type === LOGIN_SUCCESS) {
    return Object.assign({}, state, action.user.user);
  }
  return state;
};
