import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from '../mini-redux';

// connect是一个高阶函数
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => Component => {
  return class WrappedComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    };

    state = {
      props: {}
    };

    componentDidMount() {
      this.mapToProps();
      // 订阅更新，每当执行store.dispatch时都会执行监听函数
      this.context.store.subscribe(() => this.mapToProps());
    }

    // 如何实现类似PureComponent
    shouldComponentUpdate(nextProps, nextState) {
      // 添加shallow compare
      const nextPropsKeys = Object.keys(nextProps);
      const nextStateKeys = Object.keys(nextState);
      return (
        nextPropsKeys.some(key => nextProps[key] !== this.props[key]) ||
        nextStateKeys.some(key => nextState[key] !== this.state[key])
      );
    }
    mapToProps() {
      const ownProps = this.props;
      const stateToProps = mapStateToProps(
        this.context.store.getState(),
        ownProps
      );
      const dispatchToProps = bindActionCreators(
        mapDispatchToProps,
        this.context.store.dispatch,
        ownProps
      );
      this.setState({
        props: { ...this.state.props, ...stateToProps, ...dispatchToProps }
      });
    }

    render() {
      return <Component {...this.state.props} />;
    }
  };
};
