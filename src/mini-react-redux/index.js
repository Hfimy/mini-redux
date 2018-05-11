import React from 'react';
import { Provider, connect } from '../custom_modules/mini-react-redux';
import store, {
  increment,
  decrement,
  incrementAsync,
  incrementTwice,
  buyApple,
  buyBanana
} from './store';

@connect(
  (state, ownProps) => {
    console.log('ownProps', ownProps)
    return {
      fruitName: state.fruit.name,
      count: state.counter.number
    }
  },
  {
    increment,
    decrement,
    incrementAsync,
    incrementTwice,
    buyApple,
    buyBanana
  }
)
class MiniReactRedux extends React.Component {
  render() {
    return (
      <div className="panel">
        <h3>Mini-React-Redux</h3>
        <div>
          {this.props.fruitName}数量：{this.props.count}
        </div>
        <div>
          <button onClick={this.props.increment}>买一个</button>
          <button onClick={this.props.decrement}>吃一个</button>
          <button onClick={this.props.incrementAsync}>
            一会去隔壁家买一个
          </button>
          <button onClick={this.props.incrementTwice}>一家买一个</button>
          <button onClick={this.props.buyBanana}>买香蕉</button>
          <button onClick={this.props.buyApple}>买苹果</button>
        </div>
      </div>
    );
  }
}

// 为了不影响外部，在内部使用Provider进行包裹
export default () => (
  <Provider store={store}>
    <MiniReactRedux name='ht' />
  </Provider>
);
