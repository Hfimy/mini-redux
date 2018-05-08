import { createStore, applyMiddleware } from './redux';
import thunk from './redux-thunk';
import arrayThunk from './redux-array-thunk';

// actionType
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// action
export const increment = () => ({
  type: INCREMENT
});
export const decrement = () => ({
  type: DECREMENT
});
export const incrementAsync = () => {
  return dispatch => {
    setTimeout(() => dispatch(increment()), 1000);
  };
};
export const incrementTwice = () => {
  return [increment(), incrementAsync()];
};
// reducer
function counter(state = { apple: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        apple: state.apple + 1
      };
    case DECREMENT:
      return {
        apple: state.apple - 1
      };
    default:
      return state;
  }
}

export default createStore(counter, applyMiddleware(thunk, arrayThunk));
