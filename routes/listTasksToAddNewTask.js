import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListTasks from '../screens/listTasks';
import AddNewTask from '../screens/addNewTask';

const AppNavigaor = createStackNavigator({
  listTasks: {screen: ListTasks},
  addNewTask: {screen: AddNewTask},
});

const ListTasksToAddNewTask = createAppContainer(AppNavigaor);
export default ListTasksToAddNewTask;
