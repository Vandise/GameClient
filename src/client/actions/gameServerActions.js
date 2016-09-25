import { createAction } from 'redux-actions';
import * as messages from '../constants/messages/gameServer';

export const setGameServer = createAction(
  'SET_GAME_SERVER', (data) => {
    return data;
  }
);

export const connectGS = createAction(
  'GS_CONNECT', (server) => {
    const payload = {
      host: server.ip,
      port: server.port,
    };
    return payload;
  }
);

export const fetchCharacters = createAction(
  'fetch_characters', (user) => {
    return user;
  }
);
