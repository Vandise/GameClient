import { CS_CONNECT } from '../constants/actions';
import { CONNECT_SERVER_HOST, CONNECT_SERVER_PORT } from '../constants/client';

export function requestLogin(host = CONNECT_SERVER_HOST, port = CONNECT_SERVER_PORT) {
  const data = { host, port };
  return {
    type: CS_CONNECT,
    data,
  };
}