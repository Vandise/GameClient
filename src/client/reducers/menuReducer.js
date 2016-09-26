import * as events from '../constants/menu';

const initialState = {

};

export default (state = initialState, action) => {
  if (action.type === events.SET_MENU) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};