import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon, Header} from 'native-base';

export default class Setting extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            backgroundColor: '#4A88B7',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text style={{color: '#0C0C5F', fontSize: 30, fontWeight: 'bold'}}>
            Settings
          </Text>
        </Header>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 48}}>Setting</Text>
        </View>
      </View>
    );
  }
}
