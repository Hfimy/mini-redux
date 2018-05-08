import React from 'react';
import { Provider, connect } from './react-redux';
import store, {
  increment,
  decrement,
  incrementAsync,
  incrementTwice
} from './store';

@connect(
  state => ({
    apple: state.apple
  }),
  {
    increment,
    decrement,
    incrementAsync,
    incrementTwice
  }
)
class MiniReactRedux extends React.Component {
  render() {
    return (
      <div className="panel">
        <h3>Mini-React-Redux</h3>
        <div>苹果数量：{this.props.apple}</div>
        <div>
          <button onClick={this.props.increment}>买一个</button>
          <button onClick={this.props.decrement}>吃一个</button>
          <button onClick={this.props.incrementAsync}>
            一会去隔壁家买一个
          </button>
          <button onClick={this.props.incrementTwice}>一家买一个</button>
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
