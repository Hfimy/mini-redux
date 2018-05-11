import React from 'react';

import store, { increment, decrement, incrementAsync } from './store';

export default class MiniRedux extends React.Component {
  state = {
    store: store.getState()
  };
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.updateStore());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.store !== this.state.store;
  }
  updateStore() {
    this.setState({ store: store.getState() });
  }
  onIncrement() {
    store.dispatch(increment());
  }
  onDecrement() {
    store.dispatch(decrement());
  }
  onIncrementAsync() {
    store.dispatch(incrementAsync());
  }
  render() {
    return (
      <div className="panel">
        <h3>Mini-Redux</h3>
        <div>苹果数量：{this.state.store.apple}</div>
        <div>
          <button onClick={this.onIncrement}>买一个</button>
          <button onClick={this.onDecrement}>吃一个</button>
          <button onClick={this.onIncrementAsync}>一会去隔壁家买一个</button>
        </div>
      </div>
    );
  }
}
