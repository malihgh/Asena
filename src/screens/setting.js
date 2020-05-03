import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {Button, Icon, Header} from 'native-base';
const myWidth = Dimensions.get('window').width;
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
          <Image
            style={{height: 430, width: myWidth}}
            source={require('../1.jpg')}
          />
        </View>
      </View>
    );
  }
}
