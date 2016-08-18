import gameStore from '../../src/client/stores/gameStore';

const properties = {
  user: { username: 'user' },
  routing: {},
  servers: [],
};

export default gameStore(properties);
