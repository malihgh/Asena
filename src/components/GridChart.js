import React, {Component} from 'react';
import {Dimensions, Text} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {GetActivityByTask} from '../db/allSchema';
import {View} from 'native-base';
import {ThemeColors} from 'react-navigation';
import {Fonts} from '../global/Fonts';

class GridChart extends Component {
  constructor(props) {
    super(props);
    // console.log('------------------------------------');
    this.state = {result: [], message: 'Select a cell to see details :)'};
    this.GetListActivity(this.props.taskId);
    console.log('first props: ', this.props.taskId);
  }
  GetListActivity = taskId => {
    // console.log('-------------------------- Get List Activity');
    // if (this.state.result.length > 0) {
    //   console.log('ALREADY SOME RESULT;');
    //   return;
    // }
    // console.log(taskId);
    // if (taskId == undefined) {
    //   return;
    // }
    GetActivityByTask(taskId)
      .then(allActivity_ => {
        this.allActivity = allActivity_;
        this.allActivity.addListener(this.on_change);
        this.ConvertListToObject();
      })
      .catch(error => {
        console.log(error);
      });
  };

  on_change = (name, changes) => {
    this.ConvertListToObject();
  };

  componentDidUpdate(oldProps) {
    // console.log(
    //   'Grid Received: ',
    //   this.props.taskId,
    //   'Old one: ',
    //   oldProps.taskId,
    // );
    if (oldProps.taskId != this.props.taskId) {
      this.GetListActivity(this.props.taskId);
      this.setState({message: 'Select a cell to see details :)'});
    }
  }

  ConvertListToObject = () => {
    let res = [];
    let itIsInList = false;
    let counter = 0;
    this.allActivity.forEach(aActivity => {
      counter++;
      // console.log('ITRRATION: ', counter, ' out of ', this.allActivity.length);

      let m = aActivity.start.getMonth() + 1;

      let date =
        aActivity.start.getFullYear() +
        '-' +
        (m >= 10 ? m : '0' + m) +
        '-' +
        aActivity.start.getDate();
      // console.log('sssssss: ', date);

      let dur_H = aActivity.end.getHours() - aActivity.start.getHours();
      let dur_M = aActivity.end.getMinutes() - aActivity.start.getMinutes();
      let dur = dur_H * 60 + dur_M;
      // console.log('aaaaaaaaaaa: ', dur);
      // if (!(date in result)) result.date = 0;
      // console.log('nnnnnnnnnnnn: ', res[0]);
      res.forEach(aRes => {
        // console.log('Comparing;', aRes.date, date);
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
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@', res.length);
    // for (let i = 0; i < res.length; i++) {
    //   console.log('\t', res[i]);
    // }
  };
  render() {
    const END_DATE = new Date();
    return (
      <View style={{flex: 1}}>
        <View style={{height: 25, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: Fonts.Montserrat,
              fontSize: 17,
              color: rgb(12, 12, 95),
            }}>
            {this.state.message}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ContributionGraph
            // style={{backgroundColor: 'red'}}
            values={this.state.result}
            endDate={END_DATE}
            numDays={10 * 7 + (END_DATE.getDay() + 1)} // 12 weeks * 7 days
            width={Dimensions.get('window').width - 20}
            height={270}
            horizontal={true}
            showOutOfRangeDays={false}
            squareSize={27}
            onDayPress={obj => {
              let selectedDate =
                obj.count == 0
                  ? `${obj.date.getFullYear()}-${(obj.date.getMonth() < 10
                      ? '0'
                      : '') + obj.date.getMonth()}-${(obj.date.getDate() < 10
                      ? '0'
                      : '') + obj.date.getDate()}`
                  : obj.date;
              this.setState({
                message: `On ${selectedDate} you worked ${obj.count} minutes`,
              });
              // console.log('CLICKED: ');
            }}
            chartConfig={{
              barPercentage: 1,
              // backgroundColor: 'red',
              // backgroundGradientFrom: 'green',
              backgroundGradientFromOpacity: 0,
              // backgroundGradientTo: 'red',
              backgroundGradientToOpacity: 0,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(12, 12, 95, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(12, 12, 95, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
      </View>
    );
  }
}

export default GridChart;
