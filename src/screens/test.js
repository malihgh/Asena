import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';

export default class ListTasks extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 48}}>ListTasks</Text>
      </View>
    );
  }
}
