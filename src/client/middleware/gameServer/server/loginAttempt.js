import { browserHistory } from 'react-router';
import * as actions from '../../../actions/loginActions';
import debug from '../../../util/console';
import { closeModal, displayModal } from '../../../actions/modalActions';
import messages from '../../../constants/messages/gameServer';

export default (action, data, dispatch) => {
  if (action === messages.LOGIN_ATTEMPT) {
    debug('Login Attempt Status: ', data);
    if (data.code === 1) {
      dispatch(closeModal());
      dispatch(actions.loginSuccess(data));
      browserHistory.push('/game');
    } else {
      dispatch(displayModal(
        data.status,
        data.code,
        ['Ok']
      ));
    }
    return true;
  }
  return false;
};
