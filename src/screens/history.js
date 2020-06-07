import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import {Button, Icon, Header} from 'native-base';
import {Fonts} from '../global/Fonts';
import HistoryTabNavigator from '../routes/HistoryTabNavigator';
export default class History extends Component {
  static navigationOptions = {
    title: 'History',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };

  render() {
    return <HistoryTabNavigator />;
  }
}
