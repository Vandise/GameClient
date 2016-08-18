import * as types from '../../src/client/constants/actions';
import { connectCS } from '../../src/client/actions/connectServerActions';

describe('Connect Server Actions', () => {
  it('Should create an action to request a connection', () => {
    const expectedAction = {
      type: types.CS_CONNECT,
      data: {
        host: 'local',
        port: 1234,
      },
    };
    expect(connectCS('local', 1234)).to.eql(expectedAction);
  });
});
