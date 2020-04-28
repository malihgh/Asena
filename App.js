import React, {Component} from 'react';
import {Provider} from 'react-redux';
import appStore from './src/redux/store/index';
import RootNavigatorComponent from './src/routes/RootNavigatorComponent';

export default class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <RootNavigatorComponent />
      </Provider>
    );
  }
}
