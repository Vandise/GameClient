import React from 'react';
import {
  connectCS,
  validateClientAttempt,
} from '../actions/connectServerActions';
import { setGameServer } from '../actions/gameServerActions';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import Styles from '../../stylesheets/containers/serverList';

export class ServerSelect extends React.Component {

  constructor(props) {
    super(props);
    this.validateClient = this.validateClient.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(connectCS());
  }

  validateClient(server) {
    this.props.dispatch(setGameServer(server));
    this.props.dispatch(
      validateClientAttempt(server)
    );
  }

  render() {
    const servers = this.props.servers;
    if (servers) {
      return (
        <div className="server-list-container">
          <ul className="server-list">
            {Object.keys(servers).map((host) => {
              return (
                <li key={host} className="host-name">{host}
                  <ul>
                    {(servers[host]).map((server) => {
                      return (
                        <li key={server.name}>
                          <a className="sub-server"
                            onClick={(e) => this.validateClient(server)}
                          >
                            <span className="server-name">
                              {server.name}
                            </span>
                            <span className="server-stats">
                              {server.connections} / {server.max_connections}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
  }
}

ServerSelect.propTypes = {
  dispatch: React.PropTypes.func,
  servers: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    servers: state.servers,
  };
};

export default connect(mapStateToProps)(ServerSelect);
