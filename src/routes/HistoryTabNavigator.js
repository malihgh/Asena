import React from 'react';
import {Icon, Button} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import HistoryDay from '../screens/historyDay';
import HistoryTask from '../screens/historyTask';

const AppNavigator = createMaterialTopTabNavigator(
  {
    HistoryDay: {
      screen: HistoryDay,
      navigationOptions: {
        tabBarLabel: 'Day history',
      },
    },

    HistoryTask: {
      screen: HistoryTask,
      navigationOptions: {
        tabBarLabel: 'Task history',
      },
    },
  },
  {
    animationEnable: true,
    swipeEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#0C0C5F',
      inactiveTintColor: '#999999',
      showLabel: true,
      //   showIcon: true,
      style: {
        backgroundColor: '#F2F2FC',
        marginTop: 10,
        borderRadius: 20,
        // shadowRadius: 2,
        // shadowOffset: 3,
        // shadowColor: 'red',
        height: 50,
        width: '80%',

        alignSelf: 'center',
        // backgroundColor: 'blue',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },
      labelStyle: {
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: 'red',
      },
      upperCaseLabel: false,
      indicatorStyle: {backgroundColor: ''},
    },
  },
);

const HistoryTabNavigator = createAppContainer(AppNavigator);
export default HistoryTabNavigator;
