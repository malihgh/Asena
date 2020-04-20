import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import Setting from '../screens/setting';
import AddNewActivity from '../screens/addNewActivity';
import AllScreens from './allScreens';
import AddNewTask from '../screens/addNewTask';

const RootNavigaor = createStackNavigator(
  {
    Home: {
      screen: AllScreens,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddNewActivity: {
      screen: AddNewActivity,
    },
    AddNewTask: {
      screen: AddNewTask,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    // headerMode: 'none',
    mode: 'modal',
  },
);

const RootNavigatorComponent = createAppContainer(RootNavigaor);
export default RootNavigatorComponent;
