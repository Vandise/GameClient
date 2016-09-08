import * as loginEvents from './gameServer/login';
import * as config from './gameServer/config';

export default {
  ...config,
  ...loginEvents,
};
