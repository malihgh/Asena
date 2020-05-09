import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Button, Icon} from 'native-base';
import {Header} from 'react-navigation-stack';
// console.log('cccccccc:' + Header.HEIGHT);
import {Fonts} from '../global/Fonts';
import RingChart from '../components/RingChart';

export default class TodayReport extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Today',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 30, fontFamily: Fonts.Montserrat_Bold},

    headerRight: (
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
        {/* <Text
          style={{
            fontSize: 48,
            fontFamily: Fonts.Montserrat_Bold,
          }}>
          TodayReport
        </Text> */}

        <RingChart />
      </View>
    );
  }
}
