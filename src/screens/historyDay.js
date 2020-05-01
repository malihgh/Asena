import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../global/Fonts';
import DatePicker from 'react-native-date-picker';

const OneDayMiliSeconds = 24 * 60 * 60 * 1000;
const myWidth = Dimensions.get('window').width - 80;

export default class HistoryDay extends Component {
  state = {selectedDate: new Date()};
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: 'blue',
        }}>
        <View style={styles.dateContainer}>
          <DatePicker
            style={{
              width: myWidth,
              alignSelf: 'center',
              //   marginTop: ,
              height: 90,
              //   backgroundColor: 'black',
            }}
            date={this.state.selectedDate}
            fadeToColor={'none'}
            maximumDate={new Date(Date.now())}
            // minimumDate={new Date(Date.now() - 3 * OneDayMiliSeconds)}
            onDateChange={d => {
              this.setState({selectedDate: d});
            }}
            mode="date"
          />
        </View>
        <View style={{flex: 5, alignSelf: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Ring chart</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>
              {this.state.selectedDate.getMonth()}/
              {this.state.selectedDate.getDate()} /
              {this.state.selectedDate.getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dateContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
});
