import * as actions from '../../src/client/actions/connectServerActions';
import * as events from '../../src/client/constants/messages/connectServer';
import * as CS from '../../src/client/middleware/connectServer';
import gameStore from '../../src/client/stores/gameStore';

const setup = () => {
  const dispatch = sinon.spy();
  const store = {
    dispatch,
  };
  return {
    store,
  };
};

describe('Connect Server Middleware', () => {
  describe('on', () => {
    describe('GET_ACTIVE_SERVERS', () => {
      it('Dispatches a list of servers', () => {
        const init = setup();
        const mockData = {
          'Host-1': [
            { name: 'Server 1' }
          ],
        };
        mockServerEvent(CS,
          {
            type: events.GET_ACTIVE_SERVERS,
            payload: mockData,
          },
          init.store
        );
        const arg = init.store.dispatch.lastCall.args[0];
        expect(arg.payload).to.eql(mockData);
      });
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
  });
});
