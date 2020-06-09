import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Button, Icon} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../global/Fonts';
import {InsertActivity, CheckActivityConflict} from '../db/allSchema';

const OneDayMiliSeconds = 24 * 60 * 60 * 1000;
const OneMinMiliSeconds = 60 * 1000;

const myWidth = Dimensions.get('window').width - 50;
export default class AddNewActivity extends Component {
  constructor(props) {
    super(props);
    // get data from home.js
    // const defaultStartDate = new Date();
    // const defaultEndDate = new Date(new Date() - -5 * OneMinMiliSeconds);
    this.state = {
      x: this.props.navigation.getParam('taskId'),
      startDate: new Date(),
      endDate: new Date(),
      ERROR_TEXT: 'Your selected time is full',
      isConflict: true,
    };
    this.CheckConflict(this.state.startDate, this.state.endDate);
  }

  static navigationOptions = {
    title: 'Add new activity',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };

  InsertNewActivity = () => {
    InsertActivity(this.state.x, this.state.startDate, this.state.endDate)
      .then(() => console.log('Activity succesfull added from add activity'))
      .catch(error => console.log(error));

    this.props.navigation.goBack();
  };

  CheckConflict = (start_Date, end_Date) => {
    const startDate = start_Date;
    const endDate = end_Date;

    CheckActivityConflict(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),

      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    )
      .then(conflict => {
        this.setState({isConflict: conflict});
        //console.log('isConflict in my app', this.state.isConflict);
        //this.forceUpdate();
      })
      .catch(error => console.log(error));
  };

  render() {
    // console.log(
    //   new Date('2020-05-20T03:00:03.250'),
    //   ' --- ',
    //   new Date(Date.now() + 5 * OneMinMiliSeconds),
    // );
    let saveBtn = {
      padding: 25,
      margin: 10,
      marginLeft: 20,
      backgroundColor: '#4A88B7',
    };
    let saveBtnView = {
      opacity: 1,
    };
    if (
      this.state.isConflict === true ||
      this.state.startDate.getTime() === this.state.endDate.getTime() ||
      this.state.endDate.getTime() > new Date() ||
      this.state.startDate.getTime() > new Date()
    ) {
      Platform.OS === 'ios'
        ? (saveBtnView.opacity = 0.5)
        : (saveBtn.opacity = 0.5);
    } else {
      saveBtnView.opacity = 1;
    }
    // console.log('SSSSSSSSSSSSS', this.state.endDate.getTime() > new Date());
    // if (this.state.startDate.getTime() === this.state.endDate.getTime()) {
    //   console.log('=========');
    // } else if (this.state.startDate.getTime() >= this.state.endDate.getTime()) {
    //   console.log('>>>>>>>>>>');
    // } else if (this.state.startDate.getTime() <= this.state.endDate.getTime()) {
    //   console.log('<<<<<<<<<<<<<<<');
    // } else if (
    //   this.state.startDate.getTime() !== this.state.endDate.getTime()
    // ) {
    //   console.log('!!!!!!!!!!!!!!!!!!');
    // }
    // let newEnd = new Date(
    //   new Date(this.state.endDate).getTime() +
    //     60 * 60 * (23 - new Date(this.state.endDate).getHours()) * 1000 +
    //     (59 - new Date(this.state.endDate).getMinutes()) * 60 * 1000,
    // );
    // console.log(
    //   'fffffffffffff',
    //   this.state.endDate,
    //   newEnd,
    // new Date(this.state.endDate),
    // 23 - new Date(this.state.endDate).getHours(),
    // 60 - new Date(this.state.endDate).getMinutes(),
    // new Date('2016-05-02T00:00:00'),
    // );
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <View style={{flex: 1}}>
            {/* {this.CheckConflict(this.state.startDate, this.state.endDate)} */}
            <View style={styles.textCountainer}>
              <Icon
                type="MaterialCommunityIcons"
                name="clock-start"
                style={styles.icon}
              />
              <Text style={styles.textTime}>Start time</Text>
            </View>
            <View style={styles.dateContainer}>
              <DatePicker
                style={{width: myWidth, alignSelf: 'center'}}
                date={this.state.startDate}
                fadeToColor={'none'}
                // maximumDate={new Date()}
                minimumDate={new Date(Date.now() - 3 * OneDayMiliSeconds)}
                onDateChange={d => {
                  // const newEndDate = new Date(d - -5 * OneMinMiliSeconds);
                  // console.log('START CHANGED to ', d, 'end->', d);
                  this.setState({startDate: d});
                  this.setState({
                    endDate: d,
                  });
                  this.CheckConflict(d, d);
                  // console.log(
                  //   'RRRRRRRRRRRRR: ',
                  //   new Date(),
                  //   'DDDDDDDDDDDD: ',
                  //   new Date(Date.now() + 10 * OneMinMiliSeconds),
                  //   'AAAAAAAAAAAAA: ',
                  //   d,
                  // );
                }}
                minuteInterval={5}
                mode="datetime"
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.textCountainer}>
              <Icon
                type="MaterialCommunityIcons"
                name="clock-end"
                style={styles.icon}
              />
              <Text style={styles.textTime}>End time</Text>
            </View>
            <View style={styles.dateContainer}>
              <DatePicker
                style={{width: myWidth, alignSelf: 'center'}}
                fadeToColor={'none'}
                // maximumDate={new Date()}
                minimumDate={this.state.startDate}
                date={this.state.endDate}
                onDateChange={d => {
                  // console.log(
                  //   'END CHANGED to ',
                  //   d,
                  //   '(start already=',
                  //   this.state.startDate,
                  //   ')',
                  // );

                  this.setState({endDate: d});
                  this.CheckConflict(this.state.startDate, d);
                }}
                minuteInterval={5}
                mode="datetime"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: 5,
                // backgroundColor: 'red',
              }}>
              {this.state.isConflict && (
                <Text style={styles.textError}>{this.state.ERROR_TEXT}</Text>
              )}
              {this.state.startDate.getTime() ===
                this.state.endDate.getTime() && (
                <Text style={styles.textError}>
                  Start and end are in a same time
                </Text>
              )}
              {this.state.endDate.getTime() > new Date() && (
                <Text style={styles.textError}>
                  You can't set a time for future
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            style={styles.cancleBtn}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textBtn}>CANCLE</Text>
          </Button>
          <View style={saveBtnView}>
            <Button
              style={saveBtn}
              onPress={() => {
                if (
                  this.state.isConflict === false &&
                  this.state.startDate.getTime() !==
                    this.state.endDate.getTime() &&
                  this.state.endDate.getTime() < new Date() &&
                  this.state.startDate.getTime() < new Date()
                ) {
                  this.InsertNewActivity();
                }
              }}>
              <Text style={styles.textBtn}>Save</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  textCountainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 3,
    marginTop: 4,
    // backgroundColor: 'red',
  },
  textTime: {
    fontSize: 20,
    color: '#808080',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 32,
    color: '#808080',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
  },
  textBtn: {
    color: '#0C0C5F',
    fontWeight: 'bold',
  },
  cancleBtn: {
    padding: 18,
    margin: 10,
    marginRight: 20,
    backgroundColor: '#4A88B7',
  },
  // saveBtn: {
  //   padding: 25,
  //   margin: 10,
  //   marginLeft: 20,
  //   backgroundColor: '#4A88B7',
  // },
  textError: {
    color: 'red',
    marginLeft: 20,
    fontSize: 16,
  },
});
