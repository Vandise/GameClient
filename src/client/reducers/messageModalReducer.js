import * as events from '../constants/modal';

const initialState = {
  modal: {
    closed: true,
    statusCode: 1,
    message: null,
    options: [],
  },
};

export default (state = initialState, action) => {
  if (action.type === events.DISPLAY_MODAL) {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === events.CLOSE_MODAL) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};
