import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from '../redux';

// connect是一个高阶函数
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => Component => {
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
    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.props === this.state.props) {
        return false;
      }
      return true;
    }
    mapToProps() {
      const stateToProps = mapStateToProps(this.context.store.getState());
      const dispatchToProps = bindActionCreators(
        mapDispatchToProps,
        this.context.store.dispatch,
        this.state.props
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
