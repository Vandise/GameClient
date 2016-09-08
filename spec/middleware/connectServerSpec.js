import * as actions from '../../src/client/actions/connectServerActions';
import * as events from '../../src/client/constants/messages/connectServer';
import * as CS from '../../src/client/middleware/connectServer';
import gameStore from '../../src/client/stores/gameStore';

const setup = () => {
  const dispatch = sinon.spy();
  const store = {
    dispatch,
  };
  const mockData = {
    'Host-1': [
      { name: 'Server 1' },
    ],
  };
  const data = {
    type: events.GET_ACTIVE_SERVERS,
    payload: mockData,
  };
  return {
    store,
    data,
    mockData,
  };
};

describe('Connect Server Middleware', () => {
  describe('on', () => {
    describe('GET_ACTIVE_SERVERS', () => {
      it('Dispatches a list of servers', () => {
        const init = setup();
        mockServerEvent(CS,
          init.data,
          init.store
        );
        const arg = init.store.dispatch.lastCall.args[0];
        expect(arg.payload).to.eql(init.mockData);
      });
    });
    it('Closes the message modal', () => {
      const init = setup();
      mockServerEvent(CS, init.data, init.store);
      const arg = init.store.dispatch.firstCall.args[0];
      expect(arg.type).to.equal('CLOSE_MODAL');
    });
  });
  describe('getActiveServers', () => {
    it('Requests a list of active servers', () => {
      const socket = mockClientSocket();
      const middleware = CS.middleware(socket, CS.client);
      const store = gameStore({}, middleware);
      const expected = [events.GET_ACTIVE_SERVERS, false];
      store.dispatch(actions.getActiveServers());
      expect(socket.emit.lastCall.args).to.eql(expected);
    });
    it('Displays the message modal', () => {
      const event = getSocketEvent(CS.client, events.GET_ACTIVE_SERVERS);
      const socket = mockClientSocket();
      const store = {};
      store.dispatch = sinon.spy();
      event(socket, store, {});
      const arg = store.dispatch.firstCall.args[0];
      expect(arg.type).to.equal('DISPLAY_MODAL');
    });
  });
  describe('validateClientAttempt', () => {
    it('Attempts to connect to the specified game server', () => {
      const socket = mockClientSocket();
      const middleware = CS.middleware(socket, CS.client);
      const store = gameStore({}, middleware);
      const server = { ip: 'localhost', port: '8080', version: '0.0.1' };
      const expected = [events.VALIDATE_CLIENT_ATTEMPT, server];
      store.dispatch(actions.validateClientAttempt(server));
      expect(socket.emit.lastCall.args).to.eql(expected);
    });
  });
});
