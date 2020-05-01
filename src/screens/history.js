import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import {Button, Icon, Header} from 'native-base';
import {Fonts} from '../global/Fonts';
import HistoryTabNavigator from '../routes/HistoryTabNavigator';
export default class History extends Component {
  static navigationOptions = {
    title: '',
    header: props => {
      // return (
      //   <View style={{height: 56, marginTop: 20}}>
      //     <Header {...props} />
      //   </View>
      // );
    },
    // headerRight: (
    //   <Icon
    //     type="FontAwesome"
    //     name="history"
    //     style={{
    //       fontSize: 40,
    //       color: '#0C0C5F',
    //       marginRight: 10,
    //       fontWeight: 'bold',
    //     }}
    //     onPress={() => {
    //       navigation.navigate('History');
    //     }}
    //   />
    // ),
    // headerStyle: {
    //   backgroundColor: 'green',
    // },
    // headerTintColor: 'green',
    // headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };
  render() {
    return <HistoryTabNavigator />;
  }
}
