import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';
// import {Header} from 'react-navigation-stack';
// console.log('cccccccc:' + Header.HEIGHT);
import {Fonts} from '../global/Fonts';
import RingChart from '../components/RingChart';
import {GetActivityByDay, GetActivityByTask} from '../db/allSchema';

export default class TodayReport extends Component {
  // static navigationOptions = ({navigation}) => ({
  //   title: 'Today',
  //   headerStyle: {
  //     backgroundColor: '#4A88B7',
  //     alignItems: 'flex-start',
  //     justifyContent: 'center',
  //   },
  //   headerTintColor: '#0C0C5F',
  //   headerTitleStyle: {fontSize: 30, fontFamily: Fonts.Montserrat_Bold},

  //   headerRight: () => (
  //     <Icon
  //       type="FontAwesome"
  //       name="history"
  //       style={{
  //         fontSize: 40,
  //         color: '#0C0C5F',
  //         marginRight: 10,
  //         fontWeight: 'bold',
  //       }}
  //       onPress={() => {
  //         navigation.navigate('History');
  //       }}
  //     />
  //   ),
  // });

  // Get = day => {
  //   const todayDate = day;
  //   GetActivityByDay(
  //     todayDate.getFullYear(),
  //     todayDate.getMonth(),
  //     todayDate.getDate(),
  //   )
  //     .then(() => console.log('get activity for', todayDate))
  //     .catch(error => console.log(error));
  // };
  // Get2 = taskId => {
  //   GetActivityByTask(taskId)
  //     .then(() => console.log('get activity for', taskId))
  //     .catch(error => console.log(error));
  // };
  // khar = new Date();

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#4A88B7', alignItems: 'center'}}>
          <Text
            style={{
              color: '#0C0C5F',
              fontSize: 30,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
            Today
          </Text>
          <Right>
            <Icon
              type="FontAwesome"
              name="history"
              style={{
                fontSize: 40,
                color: '#0C0C5F',
              }}
              onPress={() => {
                this.props.navigation.navigate('History');
              }}
            />
          </Right>
        </Header>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'blue',
          }}>
          <Text
            style={{
              fontSize: 38,
              marginTop: 5,
              fontFamily: Fonts.Montserrat,
            }}>
            TodayReport
          </Text>

          <RingChart date={new Date()} />
          {/* <RingChart date={new Date('2020-07-04T01:00:00.000Z')} /> */}

          <Button
            // transparent
            style={{
              width: 280,
              backgroundColor: '#4A88B7',
              marginBottom: 15,
              paddingLeft: 120,
              borderRadius: 30,
              opacity: 0.8,
              // alignItems: 'center',
              // flexDirection: 'row',
            }}
            onPress={() => {
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
          </Button>
        </View>
      </View>
    );
  }
}
