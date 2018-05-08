// function bindActionCreator(actionCreator, dispatch) {
//   return function() {
//     return dispatch(actionCreator.apply(this, arguments));
//   };
// }
const bindActionCreator = (actionCreator, dispatch) => () =>
  dispatch(actionCreator(...arguments));

export default function bindActionCreators(actionCreators, dispatch, ownProps) {
  if (typeof actionCreators === 'function') {
    return actionCreators(dispatch, ownProps);
  }
  if (typeof actionCreators !== 'object') {
    throw new Error('bindActionCreators expected an object or a function.');
  }

  const boundActionCreators = {};

  // 可以使用数组的reduce累加器写法
  //   for (let key of Object.keys(actionCreators)) {
  //     boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  //   }

  Object.keys(actionCreators).reduce((accumulator, currentValue) => {
    accumulator[currentValue] = bindActionCreator(
      actionCreators[currentValue],
      dispatch
    );
    return accumulator;
  }, boundActionCreators);

  return boundActionCreators;
}
