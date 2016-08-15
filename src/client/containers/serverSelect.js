import React from 'react';
import ReactDOM from 'react-dom';
import { requestLogin } from '../actions/connectServerActions';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    servers: store.servers,
  };
})
export default class ServerSelect extends React.Component {

  componentWillMount() {
    this.props.dispatch(requestLogin());
  }

  render() {
    console.log(this.props.servers);
    return null;
  }
};