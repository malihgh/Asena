import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';

export default class TodayReport extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Today',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 30},

    headerRight: (
      <Button
        style={{backgroundColor: '#236A9F', marginRight: 10, borderRadius: 6}}
        onPress={() => {
          navigation.navigate('History');
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#0C0C5F',
            padding: 5,
            fontWeight: 'bold',
          }}>
          History
        </Text>
      </Button>
    ),
  });
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 48}}>TodayReport</Text>
      </View>
    );
  }
}
