import React from 'react';
import { Provider, connect } from './react-redux';
import store, { increment, decrement } from './store';

@connect(
  state => ({
    apple: state.apple
  }),
  {
    increment,
    decrement
  }
)
class MiniReactRedux extends React.Component {
  render() {
    return (
      <div className="panel">
        <h3>React-Redux</h3>
        <div>苹果数量：{this.props.apple}</div>
        <div>
          <button onClick={this.props.increment}>买一个</button>
          <button onClick={this.props.decrement}>吃一个</button>
        </div>
      </div>
    );
  }
}

// 为了不影响外部，在内部使用Provider进行包裹
export default () => (
  <Provider store={store}>
    <MiniReactRedux />
  </Provider>
);
