import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Pie from 'react-native-pie';

export default class RingChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            // backgroundColor: 'red',
            height: 310,
          }}>
          <Pie
            radius={130}
            innerRadius={90}
            sections={[
              {
                percentage: 4,
                color: '#FFE32D',
              },
              {
                percentage: 8,
                color: '#FFA500',
              },
              {
                percentage: 20,
                color: '#FF4500',
              },
              {
                percentage: 10,
                color: '#FF0000',
              },
              {
                percentage: 4,
                color: '#00FF00',
              },
              {
                percentage: 8,
                color: '#00A000',
              },
              {
                percentage: 20,
                color: '#006600',
              },
              {
                percentage: 10,
                color: '#32FCFC',
              },
              {
                percentage: 17,
                color: '#C0C0C0',
              },
            ]}
            // dividerSize={4}
            strokeCap={'round'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
