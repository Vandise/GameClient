import reducer from '../../src/client/reducers/serverReducer';
import * as actions from '../../src/client/constants/messages/connectServer';

describe('Server Reducer', () => {
  it('handles the SET_ACTIVE_SERVERS event', () => {
    const payload = {
      host: {
        name: 'Server 1',
      },
    };
    expect(reducer({}, {
      type: actions.SET_ACTIVE_SERVERS,
      payload,
    })).to.eql(payload);
  });
});
