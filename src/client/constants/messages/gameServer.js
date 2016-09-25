import * as loginEvents from './gameServer/login';
import * as config from './gameServer/config';
import * as characterMenu from './gameServer/characterMenu';

export default {
  ...config,
  ...loginEvents,
  ...characterMenu,
};
