import * as actions from '../../../actions/connectServerActions';
import debug from '../../../util/console';
import { GET_ACTIVE_SERVERS } from '../../../constants/messages/connectServer';

export default (action, data, dispatch) => {
  if (action === GET_ACTIVE_SERVERS) {
    debug('Setting Servers: ', data);
    dispatch(actions.setActiveServers(data));
  }
  return false;
};
