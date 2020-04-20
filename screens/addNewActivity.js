import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';

export default class AddNewActivity extends Component {
  static navigationOptions = {
    title: 'Add new activity',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25},
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 48}}>AddNewActivity</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'blue',
          }}>
          <Text style={{fontSize: 48}}>AddNewActivity</Text>
        </View>
      </View>
    );
  }
}
