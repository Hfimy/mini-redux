import { createStore } from './redux';

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

export default createStore(counter);
