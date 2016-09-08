import { browserHistory } from 'react-router';
import * as actions from '../../../actions/connectServerActions';
import * as messages from '../../../constants/messages/client';
import debug from '../../../util/console';
import { closeModal, displayModal } from '../../../actions/modalActions';
import { VALIDATE_CLIENT_ATTEMPT } from '../../../constants/messages/connectServer';

export default (action, data, dispatch) => {
  if (action === VALIDATE_CLIENT_ATTEMPT) {
    debug('Validate Client Status: ', data);
    if (data.status) {
      dispatch(closeModal());
      browserHistory.push('/login');
    } else {
      dispatch(displayModal(
        messages.INVALID_CLIENT,
        2,
        ['Ok']
      ));
    }
    return true;
  }
  return false;
};
