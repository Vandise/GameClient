import debug from '../../../../util/console';
import messages from '../../../../constants/messages/gameServer';
import { setCharacters } from '../../../../actions/gameServerActions';

export default (action, data, dispatch, store) => {
  if (action === messages.FETCH_CHARACTERS) {
    dispatch(setCharacters(data));
    return true;
  }
  return false;
};
