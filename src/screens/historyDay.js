import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, Alert} from 'react-native';
import {Fonts} from '../global/Fonts';
import {Button, Icon} from 'native-base';
import DatePicker from 'react-native-date-picker';
import RingChart from '../components/RingChart';

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
              height: 80,
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
        <View
          style={{
            flex: 6,
            alignSelf: 'center',
            justifyContent: 'center',
            // marginBottom: -27,
            marginTop: 30,
          }}>
          {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text>
              {this.state.selectedDate.getMonth()}/
              {this.state.selectedDate.getDate()} /
              {this.state.selectedDate.getFullYear()}
            </Text>
          </View> */}

          <RingChart date={this.state.selectedDate} />
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Button
            // transparent
            style={{
              width: 280,
              backgroundColor: '#4A88B7',
              marginBottom: 2,
              paddingLeft: 120,
              borderRadius: 30,
              opacity: 0.8,
              // alignItems: 'center',
              // flexDirection: 'row',
            }}
            onPress={() => {
              // Alert.alert('OOOOOPS!');
              this.props.navigation.navigate('EditActivity', {
                date: new Date(),
              });
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                // backgroundColor: 'red',
                right: 90,
              }}>
              <Text
                style={{
                  color: '#0C0C5F',
                  fontFamily: Fonts.Montserrat_Bold,
                }}>
                See details
              </Text>
            </View>

            <Icon
              type="MaterialIcons"
              name={'navigate-next'}
              style={{color: '#0C0C5F', marginLeft: 20}}
            />
          </Button> */}
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
