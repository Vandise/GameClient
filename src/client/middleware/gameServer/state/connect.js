import debug from '../../../util/console';

const action = 'connect';
const dispatch = (store, next, action, socket) => () => {
  debug('Gameserver connected');
};

export default {
  action,
  dispatch,
};
