import { CS_CONNECT } from '../constants/actions';
import { CONNECT_SERVER_HOST, CONNECT_SERVER_PORT } from '../constants/client';

export
function connectCS(host = CONNECT_SERVER_HOST, port = CONNECT_SERVER_PORT) {
  const payload = { host, port };
  return {
    type: CS_CONNECT,
    payload,
  };
}
