import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import userReducer from '../reducers/userReducer';
import serverReducer from '../reducers/serverReducer';
import messageModalReducer from '../reducers/messageModalReducer';
import csMiddleware from '../middleware/connectServer';

const initialState = {
  user: { username: null },
  routing: {},
  servers: {},
  modal: {
    closed: true,
    message: null,
    options: [],
  },
};

const reducers = combineReducers({
  user: userReducer,
  servers: serverReducer,
  routing: routerReducer,
  modal: messageModalReducer,
});

export default (state = initialState, cs = csMiddleware) => {
  const store = createStore(reducers, state,
    applyMiddleware(thunk, cs)
  );

  store.subscribe(() => {
    // console.log('Update Game State', store.getState());
  });

  return store;
};
