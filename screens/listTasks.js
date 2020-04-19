import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon} from 'native-base';

export default class ListTasks extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Tasks',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 30},

    headerRight: (
      <Icon
        type="FontAwesome"
        name="plus-circle"
        style={{fontSize: 40, color: '#0C0C5F', marginRight: 10}}
        onPress={() => {
          navigation.navigate('addNewTask');
        }}
      />
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
        <Text style={{fontSize: 48}}>ListTasks</Text>
      </View>
    );
  }
}
