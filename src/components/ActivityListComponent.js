import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Card, CardItem, Icon} from 'native-base';
import {Fonts} from '../global/Fonts';
import {DeleteActivity} from '../db/allSchema';
const myWidth = Dimensions.get('window').width - 100;

export default class ActivityListComponent extends Component {
  createTwoButtonAlert = () =>
    Alert.alert(
      'Deleting ' + this.props.taskName,
      'Are you sure you want to delete ' + this.props.taskName + '?',
      [
        {
          text: 'OK',
          onPress: () => {
            // this.props.deleteTask(this.props.activityId);

            DeleteActivity(this.props.activityId)
              .then(activityId => {
                console.log('Task ' + activityId + ' successfully deleted');
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

  ConvertDateObjectToTime(d) {
    let result =
      (d.getHours() < 10 ? '0' : '') +
      d.getHours() +
      ':' +
      (d.getMinutes() < 10 ? '0' : '') +
      d.getMinutes();
    return result;
  }
  ConvertDateObjectToDate(d) {
    let result =
      d.getFullYear() +
      '/' +
      (d.getMonth() < 9 ? '0' : '') +
      (d.getMonth() + 1) +
      '/' +
      (d.getDate() < 10 ? '0' : '') +
      d.getDate();
    return result;
  }

  render() {
    const myColor = this.props.taskColor;
    return (
      <View>
        <Card transparent style={styles.container}>
          {/* color */}
          <CardItem style={styles.color}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: myColor,
                borderColor: '#323232',
                borderWidth: 1,
                borderRadius: 25,
                marginLeft: 4,
              }}
            />
          </CardItem>
          <CardItem
            style={{
              flexDirection: 'column',
              // backgroundColor: 'blue',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: myWidth,
              height: 50,
              //   marginLeft: 3,
            }}>
            {/* name & time */}
            <View
              style={{
                // backgroundColor: 'yellow',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              {/* name */}
              <Text numberOfLines={1} style={styles.text}>
                {this.props.taskName}
              </Text>

              <View style={{flexDirection: 'row'}}>
                {/* Date */}
                <Text>
                  {/* {this.props.startDate.getDate()} /
                  {this.props.startDate.getMonth()}/
                  {this.props.startDate.getFullYear()} */}
                  {this.ConvertDateObjectToDate(this.props.startDate)}
                </Text>
                {/* <Text>{'                         '}</Text> */}
                <Text style={{marginLeft: 80}}>
                  {this.ConvertDateObjectToTime(this.props.startDate)}
                  {' - '}
                  {this.ConvertDateObjectToTime(this.props.endDate)}
                </Text>
              </View>
            </View>
          </CardItem>

          {/* trash */}
          <CardItem style={styles.trash}>
            <Icon
              type="Ionicons"
              name="md-trash"
              onPress={this.createTwoButtonAlert}
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

    // backgroundColor: 'gray',
  },
  trash: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  color: {
    width: 30,
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
    fontFamily: Fonts.Montserrat,
  },
});
