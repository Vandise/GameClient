import React from 'react';
import { connect } from 'react-redux';

export function gameHandler({ dispatch, state }) {
  const client = state.client.client;
  console.log('Rendering handler', client.isInitialized);
  client.setPlayerData(state);
  if (!client.isInitialized) {
    client.initalize();
  }
  return null;
}

gameHandler.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(gameHandler);
