import { handleActions } from 'redux-actions';

export default handleActions({
  FETCH_CHARACTERS: (state, action) => {
    return action.payload.characters;
  },
}, {

});
