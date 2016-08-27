import { ENABLE_DEBUG } from '../constants/client';

export default (...args) => {
  if (ENABLE_DEBUG) {
    const color = 'background: #222; color: #bada55';
    args.forEach((arg) => {
      console.log('%c CLIENT DEBUG: ', color, arg);
    });
  }
};
