import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Home from './screens/home';
import AddNewTask from './screens/addNewTask';
// import AddNewTask2 from './screens/test';
import ListTasks from './screens/listTasks';

import HomeToAddNewActivity from './routes/homeToAddNewActivity';
import TodayReportToHistory from './routes/todayReportToHistory';
import ListTasksToAddNewTask from './routes/listTasksToAddNewTask';
import AllScreens from './routes/allScreens';

export default class App extends Component {
  render() {
    return <AllScreens />;
  }
}
