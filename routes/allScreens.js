import React from 'react';
import {Icon, Button} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Home from '../screens/home';
import TodayReport from '../screens/todayReport';
import ListTasks from '../screens/listTasks';
import Setting from '../screens/setting';

import TodayReportToHistory from './todayReportToHistory';
import ListTasksToAddNewTask from './listTasksToAddNewTask';

const AppNavigaor = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        // tabBarLabel: 'H',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="home"
            style={{fontSize: 30, color: tintColor}}
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
        // tabBarLabel: 'H',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="cog"
            style={{fontSize: 28, color: tintColor}}
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
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true,
      style: {backgroundColor: '#F2F2FC'},
    },
  },
);

const AllScreens = createAppContainer(AppNavigaor);
export default AllScreens;
