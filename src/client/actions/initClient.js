import { INIT_GAME } from '../constants/client';
import GameClient from '../game/game';

export function initGame(user, dispatch) {
  const payload = {
    gameClient: GameClient,
    dispatch: dispatch,
    user,
  };
  return {
    type: INIT_GAME,
    payload,
  };
}