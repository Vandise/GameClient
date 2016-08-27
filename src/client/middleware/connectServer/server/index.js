import setActiveServers from './getActiveServers';

const events = [
  setActiveServers,
];

export default (socket, store, next, actionObj) => (event, action, data) => {
  return events.some((e) => {
    return e(action, data, store.dispatch);
  });
};
