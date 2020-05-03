import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
class GridChart extends Component {
  render() {
    const commitsData = [
      {date: '2017-01-02', count: 1},
      {date: '2017-01-03', count: 2},
      {date: '2017-01-04', count: 3},
      {date: '2017-01-05', count: 4},
      {date: '2017-01-06', count: 5},
      {date: '2017-01-30', count: 2},
      {date: '2017-01-31', count: 3},
      {date: '2017-03-01', count: 2},
      {date: '2017-04-02', count: 4},
      {date: '2017-03-05', count: 2},
      {date: '2017-02-30', count: 4},
      {date: '2017-04-01', count: 9.8},
      {date: '2017-03-31', count: 3},
      {date: '2017-03-30', count: 5.6},
      {date: '2017-03-29', count: 8.2},
      {date: '2017-03-28', count: 10.9},
      {date: '2017-03-27', count: 4},
    ];
    return (
      <ContributionGraph
        values={commitsData}
        endDate={new Date('2017-04-01')}
        numDays={105}
        width={Dimensions.get('window').width}
        height={210}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#8BC3EE',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(12, 12, 95, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(12, 12, 95, ${opacity})`,
          style: {
            borderRadius: 16,
            alignSelf: 'center',
            margin: 5,
          },
        }}
      />
    );
  }
}

export default GridChart;
