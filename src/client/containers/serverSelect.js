import React from 'react';
import { connectCS } from '../actions/connectServerActions';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    servers: store.servers,
  };
})
export default class ServerSelect extends React.Component {

  componentWillMount() {
    this.props.dispatch(connectCS());
  }

  render() {
    return null;
  }
}

ServerSelect.propTypes = {
  dispatch: React.PropTypes.func,
};
