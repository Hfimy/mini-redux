/* 
 第二个参数和第三个参数可选，所以需要做前置判断
 如果使用ts写，是否可以避免这些繁琐的判断？ 
*/
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  // 如果传入两个参数reducer和enhancer
  if (typeof preloadedState === 'function') {
    if (typeof enhancer !== 'undefined') {
      throw new Error('Expected the preloadedState not to be a function.');
    }

    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 如果传入三个参数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    // 此处针对enhancer特殊处理，直接返回
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentState = preloadedState;
  const currentListeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    currentListeners.push(listener);

    // 这里应该返回一个函数，当它执行时取消该listener的监听
    return function unsubscribe() {
      // 注：indexOf方法无法识别数组的NaN成员,但findIndex方法借助Object.is可以做到
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    if (typeof action !== 'object') {
      throw new Error('Actions must be plain objects.');
    }
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property.');
    }

    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());

    return action;
  }

  // 生成store时，派发一个初始化的action,使得store.getState()返回初始值
  dispatch({ type: '@@redux/INIT' });

  return {
    getState,
    subscribe,
    dispatch
  };
}
