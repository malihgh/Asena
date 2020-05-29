import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddNewActivity from '../screens/addNewActivity';
import TabNavigator from './TabNavigator';
import AddNewTask from '../screens/addNewTask';
import EditActivity from '../screens/editActivity';

const RootNavigaor = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddNewActivity: {
      screen: AddNewActivity,
    },
    AddNewTask: {
      screen: AddNewTask,
    },
    EditActivity: {
      screen: EditActivity,
    },
  },
  {
    // style: {backgroundColor: '#F2F2FC', fontSize: 40, height: 60},
    // headerMode: 'none',
    mode: 'modal',
  },
);

const RootNavigatorComponent = createAppContainer(RootNavigaor);
export default RootNavigatorComponent;
