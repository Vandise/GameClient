import * as types from '../constants/modal';

export function closeModal() {
  return {
    type: types.CLOSE_MODAL,
    payload: {
      closed: true,
      statusCode: 1,
      message: null,
      options: [],
    },
  };
}

export function displayModal(message, statusCode = 1, options = []) {
  return {
    type: types.DISPLAY_MODAL,
    payload: {
      message,
      statusCode,
      options,
      closed: false,
    },
  };
}
