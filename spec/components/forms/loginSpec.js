import React from 'react';
import { mount } from 'enzyme';
import gameStore from '../../helpers/storeHelper';
import LoginForm from '../../../src/client/components/forms/login';
import { LOGIN_ATTEMPT } from '../../../src/client/constants/actions';

const setup = () => {
  gameStore.dispatch = sinon.spy();
  const component = mount(
    <LoginForm store={gameStore} />
  );
  return {
    component,
    loginButton: component.find('#login'),
    accountField: component.find('#account'),
    passwordField: component.find('#password'),
  };
};

describe('Login Form', () => {
  describe('Login Attempt', () => {
    it('Should be called when the login button is clicked', () => {
      const output = setup();
      output.loginButton.simulate('click');
      const spy = output.component.props().store.dispatch;
      const arg = spy.getCalls(0)[0].args[0];
      expect(spy.callCount).to.equal(1);
    });
    it('Should dispatch the username and password', () => {
      const output = setup();
      output.accountField.get(0).value = 'username';
      output.passwordField.get(0).value = 'password';
      output.loginButton.simulate('click');

      const spy = output.component.props().store.dispatch;
      const arg = spy.getCalls(0)[0].args[0];
      expect(arg.type).to.equal(LOGIN_ATTEMPT);
      expect(arg.data.username).to.equal('username');
      expect(arg.data.password).to.equal('password');
    });
  });
});
