function createArrayThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (Array.isArray(action)) {
      return action.forEach(item => dispatch(item));
    }
    return next(action);
  };
}

export default createArrayThunkMiddleware();
