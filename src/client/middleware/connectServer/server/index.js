import setActiveServers from './getActiveServers';

const events = [
  setActiveServers,
];

export default (socket, store, next, action) => (event, data) => {
  return events.some((e) => {
    return e(event, data, store.dispatch);
  });
};
