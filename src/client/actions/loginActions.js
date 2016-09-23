import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS
} from '../constants/messages/gameServer/login';

export function requestLogin(username, password) {
  const data = { username, password };
  return {
    type: LOGIN_ATTEMPT,
    data,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
