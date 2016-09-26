import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import gameStore from './client/stores/gameStore';
import MessageModal from './client/components/modals/messageModal';
import loginForm from './client/components/forms/login';
import serverSelect from './client/containers/serverSelect';
import gameContainer from './client/containers/gameContainer';
import MenuContainer from './client/containers/menuContainer';

// eslint-disable-next-line no-unused-vars
import Styles from './stylesheets/main.scss';

const el = document.getElementById('main');
const store = gameStore();
const history = syncHistoryWithStore(browserHistory, store);

let routes = (
  <Route handler={ ({ children }) => children }>
    <Route
      path="/"
      name="serverSelect"
      component={serverSelect}
    />
    <Route
      path="/login"
      name="login"
      component={loginForm}
    />
    <Route
      path="/game"
      name="game"
      component={gameContainer}
    />
  </Route>
);


ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper" id="gameContainer">
      <MenuContainer />
      <MessageModal />
      <Router history={history} routes={routes} />
    </div>
  </Provider>,
  el
);

