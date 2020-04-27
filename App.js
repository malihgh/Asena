import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import RootNavigatorComponent from './src/routes/RootNavigatorComponent';

export default class App extends Component {
  render() {
    return <RootNavigatorComponent />;
  }
}
