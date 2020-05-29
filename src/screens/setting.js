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

export default class Setting extends Component {
  createTwoButtonAlertForDelALL = () =>
    Alert.alert(
      'Deleting All tasks and datas!!!!',
      'Are you sure want to deleting all tasks ?',
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
      'Deleting All activity and datas!!!!',
      'Are you sure want to deleting all activity ?',
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
      'Deleting All activities for Today!!!!',
      'Are you sure want to deleting all today activity ?',
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
          <Button
            style={style.buttonStyle}
            onPress={this.createTwoButtonAlertForDelALL}>
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
            <Text style={style.textStyle}>Delete all activity for Today</Text>
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
  },
  buttonStyle: {
    backgroundColor: '#C0C0C0',
    height: 50,
    margin: 10,
    marginVertical: 4,
  },
  textStyle: {
    fontFamily: Fonts.Montserrat,
    fontSize: 20,
    color: 'black',
    padding: 7,
  },
});
