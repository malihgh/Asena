import React from 'react';
import {Icon, Button} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Home from '../screens/home';
import ListTasks from '../screens/listTasks';
import Setting from '../screens/setting';

import TodayReportToHistory from './todayReportToHistory';

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="home"
            style={{fontSize: 26, color: tintColor}}
          />
        ),
        barStyle: {backgroundColor: 'red'},
      },
    },
    TodayReport: {
      screen: TodayReportToHistory,
      navigationOptions: {
        tabBarLabel: 'Today',
        tabBarIcon: ({tintColor}) => (
          <Icon
            // type="FontAwesome"
            type="MaterialCommunityIcons"
            name="chart-arc"
            style={{fontSize: 28, color: tintColor}}
          />
        ),
        barStyle: {backgroundColor: 'red'},
      },
    },
    ListTasks: {
      screen: ListTasks,
      navigationOptions: {
        tabBarLabel: 'Tasks',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome5"
            name="tasks"
            style={{fontSize: 25, color: tintColor}}
          />
        ),
        barStyle: {backgroundColor: 'red'},
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="cog"
            style={{fontSize: 27, color: tintColor}}
          />
        ),
      },
    },
  },
  {
    animationEnable: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#0C0C5F',
      //B0B0B0   999999 767676
      inactiveTintColor: '#999999',
      showLabel: true,
      showIcon: true,
      style: {backgroundColor: '#F2F2FC', fontSize: 40, height: 60},
      labelStyle: {
        fontSize: 10,
        margin: 0,
        padding: 0,
      },
      upperCaseLabel: false,
      indicatorStyle: {backgroundColor: ''},
    },
  },
);

const TabNavigator = createAppContainer(AppNavigator);
export default TabNavigator;
