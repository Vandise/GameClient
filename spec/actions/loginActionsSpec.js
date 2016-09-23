import * as types from '../../src/client/constants/messages/gameServer';
import { requestLogin } from '../../src/client/actions/loginActions';

describe('Login Actions', () => {
  it('Creates an action to request a login', () => {
    const expectedAction = {
      type: types.LOGIN_ATTEMPT,
      data: {
        username: 'user',
        password: 'password',
      },
    };
    expect(requestLogin('user', 'password')).to.eql(expectedAction);
  });
});
