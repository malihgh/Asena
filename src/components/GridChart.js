import React, {Component} from 'react';
import {Dimensions, ScrollView, Text} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {GetActivityByTask} from '../db/allSchema';
import {View} from 'native-base';
import {ThemeColors} from 'react-navigation';
import {Fonts} from '../global/Fonts';

const width = Dimensions.get('window').width;
class GridChart extends Component {
  constructor(props) {
    super(props);
    // console.log('------------------------------------');
    this.state = {
      result: [],
      START_DATE: '',
      message: 'Select a cell to see details :)',
    };
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
        // console.log('all activit', allActivity_);
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
    this.allActivity.forEach(aActivity => {
      // console.log('ITRRATION: ', counter, ' out of ', this.allActivity.length);
      let m = aActivity.start.getMonth() + 1;
      let d = aActivity.start.getDate();
      let date =
        aActivity.start.getFullYear() +
        '-' +
        (m >= 10 ? m : '0' + m) +
        '-' +
        (d >= 10 ? d : '0' + d);
      // console.log('sssssss: ', date);

      let get_H = aActivity.end.getHours() - aActivity.start.getHours();

      let dur_H = get_H > -1 ? get_H : get_H + 24;

      let dur_M = aActivity.end.getMinutes() - aActivity.start.getMinutes();
      let dur = dur_H * 60 + dur_M;
      // console.log(
      //   'Activity #',
      //   aActivity.id,
      //   aActivity.taskId,
      //   'start:',
      //   aActivity.start,
      //   // 'H:',
      //   // aActivity.start.getHours(),
      //   'end:',
      //   aActivity.end,
      //   // 'H:',
      //   // aActivity.end.getHours(),
      //   // 'date:',
      //   // date,
      //   ' duration:',
      //   dur_H,
      //   ':',
      //   dur_M,
      //   '=',
      //   dur,
      // );
      // if (!(date in result)) result.date = 0;
      // console.log('nnnnnnnnnnnn: ', res[0]);
      let activtyWithSameDateAlreadyVisited = false;
      res.forEach(aRes => {
        //console.log('Comparing;', aRes.date, date);
        if (date === aRes.date) {
          activtyWithSameDateAlreadyVisited = true;
          aRes.count += dur;
        }
      });
      if (!activtyWithSameDateAlreadyVisited) {
        res.push({
          date: date,
          count: dur,
        });
      }
    });
    res.push({date: '2010-01-01', count: 0});
    // for (let i = 0; i < res.length; i++) {
    //   if (res[i].count < 0) {
    //     console.log('warningggggggggg', '\t', res[i].count, res[i]);

    //     res[i].count = 10000;
    //   }
    // }

    this.setState({result: res});
    this.setState({START_DATE: res[0].date});

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@', res.length);
    // for (let i = 0; i < res.length; i++) {
    //   console.log('\t', res[i]);
    // }
  };
  render() {
    const END_DATE = new Date();
    const START_DATE_ = new Date(this.state.START_DATE);
    let number_day =
      // (END_DATE.getFullYear() - START_DATE_.getFullYear()) * 365 +
      (END_DATE.getMonth() - START_DATE_.getMonth() + 1) * 30;

    if (Number.isNaN(number_day)) number_day = 80;
    const width_ = Math.round(number_day / 80);
    // console.log('DDDDDDD:', Math.round(number_day / 80), '>>>>>>', number_day);

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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ContributionGraph
              values={this.state.result}
              endDate={END_DATE}
              numDays={number_day}
              width={Dimensions.get('window').width * width_}
              height={270}
              horizontal={true}
              showOutOfRangeDays={true}
              squareSize={27}
              onDayPress={obj => {
                let selectedDate =
                  obj.count == 0
                    ? `${obj.date.getFullYear()}-${(obj.date.getMonth() < 9
                        ? '0'
                        : '') +
                        (obj.date.getMonth() + 1)}-${(obj.date.getDate() < 10
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
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default GridChart;
