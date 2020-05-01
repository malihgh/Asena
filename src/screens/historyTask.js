import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../global/Fonts';

export default class HistoryTask extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: Fonts.Montserrat_Bold,
          }}>
          HistoryTask
        </Text>
      </View>
    );
  }
}
