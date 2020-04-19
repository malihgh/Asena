import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';

export default class History extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25},
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 48}}>History</Text>
      </View>
    );
  }
}
