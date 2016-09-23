import * as types from '../../src/client/constants/messages/connectServer';
import * as actions from '../../src/client/actions/connectServerActions';
import * as clientConstants from '../../src/client/constants/client';

describe('Connect Server Actions', () => {
  it('Creates an action to request a connection', () => {
    const expectedAction = {
      type: types.CS_CONNECT,
      payload: {
        host: 'local',
        port: 1234,
      },
    };
    expect(actions.connectCS('local', 1234)).to.eql(expectedAction);
  });
  it('Creates an action to retrieve a server list', () => {
    const expectedAction = {
      type: types.GET_ACTIVE_SERVERS,
      payload: false,
    };
    expect(actions.getActiveServers()).to.eql(expectedAction);
  });
  it('Creates an action to set a server list', () => {
    const host = {
      name: 'Host-1',
    };
    const expectedAction = {
      type: types.SET_ACTIVE_SERVERS,
      payload: host,
    };
    expect(actions.setActiveServers(host)).to.eql(expectedAction);
  });
  it('Creates an action to validate the current client version', () => {
    const server = {
      ip: 'local',
      port: 1234,
    };
    const expectedAction = {
      host: 'local',
      port: 1234,
      version: clientConstants.CLIENT_VERSION,
    };
    expect(actions.validateClientAttempt(server)).to.eql({
      type: types.VALIDATE_CLIENT_ATTEMPT,
      payload: expectedAction,
    });
  });
});
