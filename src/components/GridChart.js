import React, {Component} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {GetActivityByTask} from '../db/allSchema';
import {View} from 'native-base';

class GridChart extends Component {
  constructor(props) {
    super(props);
    // console.log('------------------------------------');
    this.state = {result: []};
  }
  GetListActivity = taskId => {
    console.log('-------------------------- Get List Activity');
    // if (this.state.result.length > 0) {
    //   console.log('ALREADY SOME RESULT;');
    //   return;
    // }
    console.log(taskId);
    if (taskId == undefined) return;
    GetActivityByTask(taskId)
      .then(allActivity_ => {
        this.allActivity = allActivity_;
        //console.log(this.allActivity);
        this.ConvertListToObject();
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(oldProps) {
    console.log(
      'Grid Received: ',
      this.props.taskId,
      'Old one: ',
      oldProps.taskId,
    );
    if (oldProps.taskId != this.props.taskId) {
      this.GetListActivity(this.props.taskId);
    }
  }

  on_change = (name, changes) => {
    //this.forceUpdate();
  };
  ConvertListToObject = () => {
    let res = [];
    let itIsInList = false;
    let counter = 0;
    this.allActivity.forEach(aActivity => {
      counter++;
      console.log('ITRRATION: ', counter, ' out of ', this.allActivity.length);

      let m = aActivity.start.getMonth() + 1;

      let date =
        aActivity.start.getFullYear() +
        '-' +
        (m >= 10 ? m : '0' + m) +
        '-' +
        aActivity.start.getDate();
      console.log('sssssss: ', date);

      let dur_H = aActivity.end.getHours() - aActivity.start.getHours();
      let dur_M = aActivity.end.getMinutes() - aActivity.start.getMinutes();
      let dur = dur_H * 60 + dur_M;
      console.log('aaaaaaaaaaa: ', dur);
      // if (!(date in result)) result.date = 0;
      // console.log('nnnnnnnnnnnn: ', res[0]);
      res.forEach(aRes => {
        console.log('Comparing;', aRes.date, date);
        if (date === aRes.date) {
          itIsInList = true;
          res.count += dur;
        }
      });
      if (!itIsInList) {
        res.push({
          date: date,
          count: dur,
        });
      }
    });
    res.push({date: '2010-01-01', count: 0});
    this.setState({result: res});
    console.log('@@@@@@@@@@@@@@@@@@@@@@@', res.length);
    for (let i = 0; i < res.length; i++) {
      console.log('\t', res[i]);
    }
  };
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
      <View>
        <ContributionGraph
          values={this.state.result}
          endDate={new Date()}
          numDays={100}
          width={Dimensions.get('window').width - 5}
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
      </View>
    );
  }
}

export default GridChart;
