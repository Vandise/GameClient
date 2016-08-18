import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import userReducer from '../reducers/userReducer';
import serverReducer from '../reducers/serverReducer';
import csMiddleware from '../middleware/connectServer';

const initialState = {
  user: { username: null },
  routing: {},
  servers: [],
};

const reducers = combineReducers({
  user: userReducer,
  servers: serverReducer,
  routing: routerReducer,
});

export default (state = initialState) => {
  const store = createStore(reducers, state,
    applyMiddleware(thunk, csMiddleware)
  );

  store.subscribe(() => {
    // console.log('Update Game State', store.getState());
  });

  return store;
};
