import { LOGIN_ATTEMPT } from '../constants/actions';

export function requestLogin(username, password) {
  const data = { username, password };
  return {
    type: LOGIN_ATTEMPT,
    data,
  };
}
