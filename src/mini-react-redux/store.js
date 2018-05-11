import { createStore, applyMiddleware, compose, combineReducers } from '../custom_modules/mini-redux';
import thunk from '../custom_modules/redux-thunk';
import arrayThunk from '../custom_modules/redux-array-thunk';

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
function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + 1
      };
    case DECREMENT:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}

// actionType
const APPLE = "APPLE";
const BANANA = "BANANA";

//action
export const buyApple = () => ({
  type: APPLE
})
export const buyBanana = () => ({
  type: BANANA
})

// reducer
function selectFruit(state = { name: '苹果' }, action) {
  switch (action.type) {
    case APPLE:
      return {
        name: '苹果'
      }
    case BANANA: {
      return {
        name: '香蕉'
      }
    }
    default:
      return state;
  }
}

const reducer = combineReducers({
  fruit: selectFruit,
  counter: counter
})

const enhancer = compose(
  applyMiddleware(thunk, arrayThunk),
  window && window.devToolsExtension ? window.devToolsExtension() : f => f
);
export default createStore(reducer, enhancer);
