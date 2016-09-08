import { createAction } from 'redux-actions';

export const setGameServer = createAction(
  'SET_GAME_SERVER', (data) => {
    return data;
  }
);
