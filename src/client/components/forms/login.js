import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/loginActions';

// eslint-disable-next-line no-unused-vars
import Styles from '../../../stylesheets/components/forms/login.scss';

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.loginAttempt = this.loginAttempt.bind(this);
  }

  loginAttempt() {
    const username = ReactDOM.findDOMNode(this.refs.account).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    this.props.dispatch(
      loginActions.requestLogin(username, password)
    );
  }

  render() {
    return (
      <div>
        <div className="login-form">
          <header>
            <h3>Server Login</h3>
          </header>
          <div className="input-container">
            <label htmlFor="account">
              <div className="label-text">Account</div>
              <input id="account" type="text" name="account" ref="account" />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="password">
              <div className="label-text">Password</div>
              <input
                id="password"
                type="password"
                name="password"
                ref="password"
              />
            </label>
          </div>
          <div className="user-actions">
            <a
              id="login"
              className="button red"
              onClick={this.loginAttempt}
            >Ok
            </a>
            <a to="/" className="button red">Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  dispatch: React.PropTypes.func,
};
