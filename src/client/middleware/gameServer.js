import messages from '../constants/messages/gameServer';
import * as GS from './gameServer/';
import socketMiddleware from 'redux-socket.io-middleware';

export const client = GS.client;
export const server = GS.server;
export const connectAction = messages.GS_CONNECT;
export const state = GS.state;
export const middleware = socketMiddleware;

export default middleware(
  null,
  GS.client,
  GS.server,
  GS.state,
  messages.GS_CONNECT,
);
