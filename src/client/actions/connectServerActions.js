import * as types from '../constants/messages/connectServer';
import { CONNECT_SERVER_HOST, CONNECT_SERVER_PORT } from '../constants/client';

export
function connectCS(host = CONNECT_SERVER_HOST, port = CONNECT_SERVER_PORT) {
  const payload = { host, port };
  return {
    type: types.CS_CONNECT,
    payload,
  };
}

export function getActiveServers() {
  return {
    type: types.GET_ACTIVE_SERVERS,
    payload: false,
  };
}

export function setActiveServers(servers = {}) {
  return {
    type: types.SET_ACTIVE_SERVERS,
    payload: servers,
  };
}

export function validateClientAttempt(server = {}) {
  return {
    type: types.VALIDATE_CLIENT_ATTEMPT,
    payload: server,
  };
}
