import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Button, Icon} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../global/Fonts';
import {InsertActivity} from '../db/allSchema';

const OneDayMiliSeconds = 24 * 60 * 60 * 1000;

const myWidth = Dimensions.get('window').width - 50;
export default class AddNewActivity extends Component {
  constructor(props) {
    super(props);
    // get data from home.js
    this.state = {
      x: this.props.navigation.getParam('taskId'),
      startDate: new Date(),
      endDate: new Date(),
    };
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

  render() {
    // console.log(this.state);
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <View style={{flex: 1}}>
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
                maximumDate={new Date(Date.now())}
                minimumDate={new Date(Date.now() - 3 * OneDayMiliSeconds)}
                onDateChange={d => {
                  this.setState({startDate: d});
                  this.setState({endDate: d});
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
                maximumDate={new Date(Date.now())}
                minimumDate={new Date(Date.now() - 3 * OneDayMiliSeconds)}
                date={this.state.endDate}
                onDateChange={d => this.setState({endDate: d})}
                minuteInterval={5}
                mode="datetime"
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            style={styles.cancleBtn}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textBtn}>CANCLE</Text>
          </Button>
          <Button style={styles.saveBtn} onPress={this.InsertNewActivity}>
            <Text style={styles.textBtn}>Save</Text>
          </Button>
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
  },
  textCountainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
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
    marginTop: 20,
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
  saveBtn: {
    padding: 25,
    margin: 10,
    marginLeft: 20,
    backgroundColor: '#4A88B7',
  },
});
