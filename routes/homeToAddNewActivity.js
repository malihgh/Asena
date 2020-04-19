import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import AddNewActivity from '../screens/addNewActivity';

const AppNavigaor = createStackNavigator({
  Home: {screen: Home},
  AddNewActivity: {screen: AddNewActivity},
});

const HomeToAddNewActivity = createAppContainer(AppNavigaor);
export default HomeToAddNewActivity;
