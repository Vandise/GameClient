import { CS_CONNECT } from '../constants/actions';
import * as clientSettings from '../constants/client';
import io from 'socket.io-client';

const csMiddleware = () => {
  let socket = null;

  const opts = {
    transports: ['websocket'],
  };

  const onConnect = (store) => data => {
    console.log('Connected');
  };

  const onEvent = (store, socket) => (event, data) => {
    console.log('On Event Caught');
    console.log(event, data);
    // go through message types and dispatch
  };

  return store => next => action => {
    switch (action.type) {

      case CS_CONNECT:
        console.log('Caught CS connect request');

        if (socket !== null) {
          socket.close();
        }

        // TODO: send a connecting message

        // Connect to the CS, send all actions to a
        // wildcard event "onEvent" so we can dispatch actions appropriately

        const connStr = `${action.data.host}:${action.data.port}`;
        socket = io.connect(connStr, opts);

        const onevent = socket.onevent;
        socket.onevent = (packet) => {
          const args = packet.data || [];
          packet.data = ['*'].concat(args);
          onevent.call(socket, packet);
        };

        socket.on('*', onEvent(store, socket));
        socket.on('connect', onConnect(store));

        // mock message
        // socket.emit('authenticate_client', {host: 'localhost', port: '55901'});
        break;

      default:
        return next(action);
    }
  };
};

export default csMiddleware();
