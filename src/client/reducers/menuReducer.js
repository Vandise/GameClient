import * as events from '../constants/menu';

const initialState = {

};

export default (state = initialState, action) => {
  if (action.type === events.SET_MENU) {
    const data = {};
    data[action.payload.menuName] = {
      open: action.payload.display,
    };
    console.log('Setting nmenu', data);
    return Object.assign({}, state, data);
  }
  return state;
};