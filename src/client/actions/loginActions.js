import { LOGIN_ATTEMPT } from '../constants/messages/gameServer/login';

export function requestLogin(username, password) {
  const data = { username, password };
  return {
    type: LOGIN_ATTEMPT,
    data,
  };
}
