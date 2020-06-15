import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {Button, Icon, Header} from 'native-base';
import {
  DeleteAllTasks,
  DeleteAllActivities,
  DeleteActivityByDay,
} from '../db/allSchema';
import {Fonts} from '../global/Fonts';
const myWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';

export default class Setting extends Component {
  DeleteAllTask = async () => {
    try {
      // const value = await AsyncStorage.getItem('selectedTaskId_Key');
      const isStart = await AsyncStorage.getItem('isStarted_Key');
      // console.log('value:', value);
      // console.log('this.props.id:', this.props.id);
      // console.log('isStart:', isStart);
      if (JSON.parse(isStart)) {
        Alert.alert("You can't delete tasks and activities with runing timer!");
      } else {
        this.createTwoButtonAlertForDelALL();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  createTwoButtonAlertForDelALL = () =>
    Alert.alert(
      'Warning',
      'Are you sure you want to delete all tasks and activities?',
      [
        {
          text: 'OK',
          onPress: () => {
            DeleteAllTasks()
              .then(alltask => {
                // console.log('AllTask', alltask, 'successfully deleted');
              })
              .catch(error => {
                console.log('Error while deleting all task');
              });
            DeleteAllActivities()
              .then(allActivities => {
                console.log(
                  'AllActivity',
                  allActivities,
                  'successfully deleted',
                );
              })
              .catch(error => {
                console.log('Error while deleting all Activities');
              });
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  createTwoButtonAlertForDelAllActivity = () =>
    Alert.alert(
      'Warning',
      'Are you sure you want to delete all activity?',
      [
        {
          text: 'OK',
          onPress: () => {
            DeleteAllActivities()
              .then(allActivities => {
                // console.log(
                //   'AllActivity',
                //   allActivities,
                //   'successfully deleted',
                // );
              })
              .catch(error => {
                console.log('Error while deleting all Activities');
              });
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  createTwoButtonAlertForDelAllActivityForToday = () =>
    Alert.alert(
      'Warning',
      'Are you sure you want to delete all todays activities?',
      [
        {
          text: 'OK',
          onPress: () => {
            const todayDate = new Date();
            DeleteActivityByDay(
              todayDate.getFullYear(),
              todayDate.getMonth(),
              todayDate.getDate(),
            )
              .then(() => console.log('delete activity for', todayDate))
              .catch(error => console.log(error));
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={style.header}>
          <Text style={style.headerText}>Settings</Text>
        </Header>
        <View style={style.btnContainer}>
          <Button style={style.buttonStyle} onPress={this.DeleteAllTask}>
            <Text style={style.textStyle}>Delete all tasks and activities</Text>
          </Button>
          <Button
            style={style.buttonStyle}
            onPress={this.createTwoButtonAlertForDelAllActivity}>
            <Text style={style.textStyle}>Delete all activity</Text>
          </Button>
          <Button
            style={style.buttonStyle}
            onPress={this.createTwoButtonAlertForDelAllActivityForToday}>
            <Text style={style.textStyle}>Delete all todays activities</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#4A88B7',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: '#0C0C5F',
    fontSize: 30,
    fontFamily: Fonts.Montserrat_Bold,
  },
  btnContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  buttonStyle: {
    backgroundColor: '#4A88B7',
    height: 50,
    margin: 7,
    marginTop: 8,
    marginVertical: 4,
    borderRadius: 14,
    opacity: 0.8,
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 9,
  },
  textStyle: {
    fontFamily: Fonts.Montserrat,
    fontSize: 20,
    color: '#0C0C5F',
    padding: 7,
    opacity: 1,
  },
});
