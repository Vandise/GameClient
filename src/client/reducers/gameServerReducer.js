import { handleActions } from 'redux-actions';

export default handleActions({
  SET_GAME_SERVER: (state, action) => {
    return action.payload;
  },
}, {

});
