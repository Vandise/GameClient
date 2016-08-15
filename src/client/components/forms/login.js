import React from 'react';
import Styles from '../../../stylesheets/components/forms/login.scss';

export default ({ props }) => {
  return (
    <div>
      <div className="login-form">
        <header>
          <h3>Server Login</h3>
        </header>
        <div className="input-container">
          <label htmlFor="account">
            <div className="label-text">Account</div>
            <input type="text" name="account" ref="account" />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <div className="label-text">Password</div>
            <input type="password" name="password" ref="password" />
          </label>
        </div>
        <div className="user-actions">
          <a className="button red">Ok</a>
          <a to="/" className="button red">Cancel</a>
        </div>
      </div>
    </div>
  );
};
