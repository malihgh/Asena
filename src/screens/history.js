import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';
import {Fonts} from '../fonts/Fonts';

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
