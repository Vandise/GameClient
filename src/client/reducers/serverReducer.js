const initialState = {
  servers: {},
};

export default (state = initialState, action) => {
  console.log('Server Reducer: ', action);
  return state;
};
