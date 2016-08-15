import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from '../reducers/userReducer';

const initialState = {
  user: {},
  routing: {},
};

const reducers = combineReducers({
  user: userReducer,
  routing: routerReducer,
});

export default (state = initialState) => {

  const store = createStore(reducers, state);

  store.subscribe(() => {
    console.log('Update Game State', store.getState());
  });

  return store;
};
