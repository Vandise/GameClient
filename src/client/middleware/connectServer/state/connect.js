const action = 'connect';
const dispatch = (store, next, action) => (socket) => {
  console.log(store, next, action);
};

export default {
  action,
  dispatch,
};
