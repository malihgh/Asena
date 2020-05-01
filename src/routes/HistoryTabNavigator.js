import React from 'react';
import {Icon, Button} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import HistoryDay from '../screens/historyDay';
import HistoryTask from '../screens/historyTask';

const AppNavigator = createMaterialTopTabNavigator(
  {
    historyDay: HistoryDay,
    historyTask: HistoryTask,
  },
  {
    animationEnable: true,
    swipeEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#0C0C5F',
      inactiveTintColor: '#d1cece',
      showLabel: true,
      //   showIcon: true,
      style: {
        backgroundColor: '#F2F2FC',
        fontSize: 40,
        margin: 20,
        marginTop: 5,
        borderRadius: 15,
        shadowRadius: 2,
        height: 40,
      },
      labelStyle: {
        fontSize: 20,
        margin: 0,
        padding: 0,
      },
      upperCaseLabel: false,
      indicatorStyle: {backgroundColor: 'white'},
    },
  },
);

const HistoryTabNavigator = createAppContainer(AppNavigator);
export default HistoryTabNavigator;
