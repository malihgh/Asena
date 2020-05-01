import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../global/Fonts';

export default class HistoryDay extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: Fonts.Montserrat_Bold,
          }}>
          HistoryDay
        </Text>
      </View>
    );
  }
}
