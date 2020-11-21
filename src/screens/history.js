import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import {Button, Icon, Header} from 'native-base';
import {Fonts} from '../global/Fonts';
import HistoryTabNavigator from '../routes/HistoryTabNavigator';
export default class History extends Component {
  static navigationOptions = {
    title: 'History',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            backgroundColor: '#4A88B7',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: '#0C0C5F',
              fontSize: 25,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
            History
          </Text>
        </Header>

        <HistoryTabNavigator
          OnSelectFunc={id => {
            // console.log('HistoryTask Picker changed to: ', id);
            this.setState({selectedTaskId: id});
          }}
        />

        {/* <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
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
          </Button>
        </View> */}
      </View>
    );
  }
}
