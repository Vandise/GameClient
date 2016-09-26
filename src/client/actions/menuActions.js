import * as types from '../constants/menu';

export function setMenu(menuName, display) {
  return {
    type: types.SET_MENU,
    payload: {
      menuName,
      display,
    }
  };
};
