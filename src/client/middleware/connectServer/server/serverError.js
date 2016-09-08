import debug from '../../../util/console';
import { displayModal } from '../../../actions/modalActions';
import { SERVER_ERROR } from '../../../constants/messages/connectServer';

export default (action, data, dispatch) => {
  if (action === SERVER_ERROR) {
    debug('Caught Server Error ', data);
    dispatch(displayModal(
      data.message,
      data.code,
      ['Ok']
    ));
    return true;
  }
  return false;
};
