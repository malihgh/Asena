import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Card, CardItem, Icon, Left, Right} from 'native-base';
import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';
import {DeleteTaskById, DeleteActivityByTaskId} from '../db/allSchema';
import AsyncStorage from '@react-native-community/async-storage';

class ListTaskComponent extends Component {
  constructor(props) {
    super(props);
  }
  DeleteTask = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedTaskId_Key');
      const isStart = await AsyncStorage.getItem('isStarted_Key');
      console.log('value:', value);
      console.log('this.props.id:', this.props.id);
      console.log('isStart:', isStart);
      if (JSON.parse(value) == this.props.id && JSON.parse(isStart)) {
        Alert.alert("You can't delete a task with runing timer!");
      } else {
        this.CreateTwoButtonAlert();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  CreateTwoButtonAlert = () =>
    Alert.alert(
      'Deleting ' + this.props.name,
      'Are you sure you want to delete ' + this.props.name + '?',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteTask(this.props.id);

            DeleteTaskById(this.props.id)
              .then(taskId => {
                console.log('Task ' + taskId + ' successfully deleted');
              })
              .catch(error => {
                console.log('Error while deleting task');
              });
            DeleteActivityByTaskId(this.props.id)
              .then(taskId => {
                console.log(
                  'Alll Activity By TaskId ' + taskId + ' successfully deleted',
                );
              })
              .catch(error => {
                console.log('Error while deleting task');
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
    const myColor = this.props.color;
    // console.log('color is:' + myColor);
    return (
      <View>
        <Card transparent style={styles.container}>
          {/* color */}
          <CardItem style={styles.color}>
            <View
              style={{
                borderRadius: 20,
                width: 38,
                height: 38,
                backgroundColor: myColor,
                borderColor: '#323232',
                borderWidth: 1,
              }}
            />
          </CardItem>
          {/* name */}
          <CardItem style={styles.body}>
            <Text numberOfLines={1} style={styles.text}>
              {this.props.name}
            </Text>
          </CardItem>
          {/* trash */}
          <CardItem style={styles.trash}>
            <Icon
              type="Ionicons"
              name="md-trash"
              onPress={this.DeleteTask}
              style={styles.icon}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    marginRight: 8,
    marginLeft: 8,
  },
  trash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 15,
  },
  color: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,

    // backgroundColor: '#DAD5D5',
  },
  icon: {
    fontSize: 33,
    alignSelf: 'center',
    marginLeft: 4,
  },
  text: {
    fontSize: 17,
    fontFamily: Fonts.Montserrat_Bold,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: id => {
      dispatch({type: 'TASK_DEL', id: id});
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ListTaskComponent);
