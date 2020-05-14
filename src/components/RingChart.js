import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Pie from 'react-native-pie';
import {GetActivityByDay, GetAllTasks} from '../db/allSchema';
import {Fonts} from '../global/Fonts';

export default class RingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ringData: [
      //   {
      //     percentage: 4,
      //     color: '#FFE32D',
      //   },
      //   {
      //     percentage: 0,
      //     color: 'black',
      //   },
      //   {
      //     percentage: 8,
      //     color: '#FFA500',
      //   },
      //   {
      //     percentage: 0,
      //     color: 'black',
      //   },
      //   {
      //     percentage: 20,
      //     color: '#FF4500',
      //   },
      //   {
      //     percentage: 10,
      //     color: '#FF0000',
      //   },
      //   {
      //     percentage: 4,
      //     color: '#00FF00',
      //   },
      //   {
      //     percentage: 8,
      //     color: '#00A000',
      //   },
      //   {
      //     percentage: 20,
      //     color: '#006600',
      //   },
      //   {
      //     percentage: 10,
      //     color: '#32FCFC',
      //   },
      //   {
      //     percentage: 7,
      //     color: '#C0C0C0',
      //   },
      // ],
      result: [],
    };
    this.NO_TASK_COLOR = 'yellow';
    this.InitilizeRingChart();
  }

  InitilizeRingChart = () => {
    let myDate = this.props.date;
    GetAllTasks()
      .then(allTasks => {
        this.setState({allTasks});

        GetActivityByDay(
          myDate.getFullYear(),
          myDate.getMonth(),
          myDate.getDate(),
        )
          .then(activityByDay_ => {
            console.log('get activity for ring chart', myDate);
            this.activityByDay = activityByDay_;
            // this.ConvertTime2Percentage(this.activityByDay[0].start);
            // console.log('aaa', this.activityByDay[0].start);
            this.CreateRingData();

            console.log('Activity Converted Date: ');
            for (let i = 0; i < this.state.result.length; i++)
              console.log('\t', this.state.result[i]);

            this.forceUpdate();
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  ConvertTime2Percentage = date => {
    const min = date.getHours() * 60 + date.getMinutes();
    // console.log('eeeeeeeeeee', (min * 100) / 1440);

    return (min * 100) / 1440;
  };

  CreateRingData = () => {
    let sum = 0;
    this.state.result = [];
    for (let i = 0; i < this.activityByDay.length; i++) {
      if (i === 0) {
        let pe = this.ConvertTime2Percentage(this.activityByDay[i].start);
        let dur_nocolor = pe - 0;
        this.state.result.push({
          percentage: dur_nocolor,
          color: this.NO_TASK_COLOR,
        });
        sum += dur_nocolor;
      }

      let ps = this.ConvertTime2Percentage(this.activityByDay[i].start);
      let pe = this.ConvertTime2Percentage(this.activityByDay[i].end);
      let dur_color = pe - ps;
      let taskId = this.activityByDay[i].taskId;
      let taskColor = this.state.allTasks[taskId].color;
      this.state.result.push({
        percentage: dur_color,
        color: taskColor,
      });
      sum += dur_color;
      if (i < this.activityByDay.length - 1) {
        let pss = this.ConvertTime2Percentage(this.activityByDay[i + 1].start);
        let dur_nocolor = pss - pe;
        this.state.result.push({
          percentage: dur_nocolor,
          color: this.NO_TASK_COLOR,
        });
        sum += dur_nocolor;
      } else {
        this.state.result.push({
          percentage: 100 - pe,
          color: this.NO_TASK_COLOR,
        });
        sum += 100 - pe;
      }
    }
    // console.log('Activity Converted Date: ', sum);
    // for (let i = 0; i < this.state.result.length; i++)
    //   console.log('\t', this.state.result[i]);
  };

  render() {
    let dataVis = null;
    if (this.state.result.length == 0) {
      dataVis = (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: Fonts.Montserrat,
            }}>
            No Data!
          </Text>
        </View>
      );
    } else {
      dataVis = (
        <View
          style={{
            // backgroundColor: 'red',
            height: 310,
          }}>
          <Pie
            radius={130}
            innerRadius={90}
            sections={this.state.result}
            // dividerSize={4}
            strokeCap={'butt'}
          />
        </View>
      );
    }
    return <View style={styles.container}>{dataVis}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
