import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../global/Fonts';
import GridChart from '../components/GridChart';

export default class HistoryTask extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontSize: 40,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
            HistoryTask
          </Text>
        </View>
        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
          <GridChart />
        </View>
      </View>
    );
  }
}
