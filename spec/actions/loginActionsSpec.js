import { requestLogin, loginSuccess } from '../../src/client/actions/loginActions';
import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS,
} from '../../src/client/constants/messages/gameServer/login';

describe('Login Actions', () => {
  it('Creates an action to request a login', () => {
    const expectedAction = {
      type: LOGIN_ATTEMPT,
      data: {
        username: 'user',
        password: 'password',
      },
    };
    expect(requestLogin('user', 'password')).to.eql(expectedAction);
  });
  it('Creates an action to login the user', () => {
    const user = { username: 'bob' };
    const expectedAction = {
      type: LOGIN_SUCCESS,
      user,
    };
    expect(loginSuccess(user)).to.eql(expectedAction);
  });
});
