const loggerMiddleware = store => next => action => {
  console.group(action.type);
  console.log('Payload', action.payload);
  const result = next(action);
  console.log('New State', store.getState());
  console.groupEnd();
  return result;
};

export default loggerMiddleware;
