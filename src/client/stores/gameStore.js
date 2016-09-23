import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import clientReducer from '../reducers/clientReducer';
import userReducer from '../reducers/userReducer';
import serverReducer from '../reducers/serverReducer';
import messageModalReducer from '../reducers/messageModalReducer';
import gameServerReducer from '../reducers/gameServerReducer';
import csMiddleware from '../middleware/connectServer';
import gsMiddleware from '../middleware/gameServer';

const initialState = {
  user: { username: null },
  routing: {},
  servers: {},
  modal: {
    closed: true,
    message: null,
    options: [],
  },
  client: null,
};

const reducers = combineReducers({
  user: userReducer,
  servers: serverReducer,
  routing: routerReducer,
  modal: messageModalReducer,
  gameServer: gameServerReducer,
  client: clientReducer,
});

export default (state = initialState, cs = csMiddleware, gs = gsMiddleware) => {
  const store = createStore(reducers, state,
    applyMiddleware(thunk, cs, gs)
  );

  store.subscribe(() => {
    //console.log('Update Game State', store.getState());
  });

  return store;
};
