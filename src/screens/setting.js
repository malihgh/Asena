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
import {DeleteAllTasks, DeleteAllActivities} from '../db/allSchema';
const myWidth = Dimensions.get('window').width;

export default class Setting extends Component {
  createTwoButtonAlert = () =>
    Alert.alert(
      'Deleting All tasks and datas!!!!',
      'Are you sure want to deleting all tasks ?',
      [
        {
          text: 'OK',
          onPress: () => {
            DeleteAllTasks()
              .then(alltask => {
                console.log('AllTask', alltask, 'successfully deleted');
              })
              .catch(error => {
                console.log('Error while deleting all task');
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
  createTwoButtonAlert2 = () =>
    Alert.alert(
      'Deleting All tasks and datas!!!!',
      'Are you sure want to deleting all tasks ?',
      [
        {
          text: 'OK',
          onPress: () => {
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
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            backgroundColor: '#4A88B7',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text style={{color: '#0C0C5F', fontSize: 30, fontWeight: 'bold'}}>
            Settings
          </Text>
        </Header>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Image
            style={{height: 430, width: myWidth}}
            source={require('../1.jpg')}
          /> */}
          <Button style={{margin: 30}} onPress={this.createTwoButtonAlert}>
            <Text>delete all tasks</Text>
          </Button>
          <Button onPress={this.createTwoButtonAlert2}>
            <Text>delete all activity</Text>
          </Button>
        </View>
      </View>
    );
  }
}
