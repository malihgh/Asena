import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Button, Icon} from 'native-base';
import {Header} from 'react-navigation-stack';
// console.log('cccccccc:' + Header.HEIGHT);
import {Fonts} from '../global/Fonts';
import RingChart from '../components/RingChart';
import {GetActivityByDay, GetActivityByTask} from '../db/allSchema';

export default class TodayReport extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Today',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 30, fontFamily: Fonts.Montserrat_Bold},

    headerRight: () => (
      <Icon
        type="FontAwesome"
        name="history"
        style={{
          fontSize: 40,
          color: '#0C0C5F',
          marginRight: 10,
          fontWeight: 'bold',
        }}
        onPress={() => {
          navigation.navigate('History');
        }}
      />
    ),
  });

  Get = day => {
    const todayDate = day;
    GetActivityByDay(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate(),
    )
      .then(() => console.log('get activity for', todayDate))
      .catch(error => console.log(error));
  };
  Get2 = taskId => {
    GetActivityByTask(taskId)
      .then(() => console.log('get activity for', taskId))
      .catch(error => console.log(error));
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'blue',
        }}>
        <Text
          style={{
            fontSize: 48,
            fontFamily: Fonts.Montserrat,
          }}>
          TodayReport
        </Text>

        <RingChart date={new Date()} />
        {/* <Button
          // transparent
          style={{width: 100}}
          onPress={this.Get(new Date())}>
          <Text>Date:2020-05-11</Text>
        </Button>
        <Button
          // transparent
          style={{width: 100}}
          onPress={this.Get2(8)}>
          <Text>Task:8</Text>
        </Button> */}
      </View>
    );
  }
}
