import { CS_CONNECT } from '../constants/messages/connectServer';
import * as CS from './connectServer/';
import socketMiddleware from 'redux-socket.io-middleware';

export const client = CS.client;
export const server = CS.server;
export const connectAction = CS_CONNECT;
export const state = CS.state;
export const middleware = socketMiddleware;

export default middleware(
  null,
  CS.client,
  CS.server,
  CS.state,
  CS_CONNECT,
);
