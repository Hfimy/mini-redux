import React from 'react';

import Redux from './redux';
import ReactRedux from './react-redux';
import MiniRedux from './mini-redux';
import MiniReactRedux from './mini-react-redux';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <div>
          <Redux />
          <ReactRedux />
        </div>
        <div>
          <MiniRedux />
          <MiniReactRedux />
        </div>
      </main>
    );
  }
}
