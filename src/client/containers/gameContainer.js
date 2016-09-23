import React from 'react';
import { connect } from 'react-redux';

export class GameContainer extends React.Component {
  render() {
    console.log(this.props.user);
    return(
      <div className='game-container'>
        <h1>This is the game!</h1>
      </div>
    );
  }
}

GameContainer.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(GameContainer);