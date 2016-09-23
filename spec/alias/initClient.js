import { INIT_GAME } from '../../src/client/constants/client';
export function initGame(user, dispatch) {
  const payload = {
    gameClient: {},
    dispatch,
    user,
  };
  return {
    type: INIT_GAME,
    payload,
  };
}