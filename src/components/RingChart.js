import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Pie from 'react-native-pie';
import {GetActivityByDay, GetAllTasks} from '../db/allSchema';
import {Fonts} from '../global/Fonts';

export default class RingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
    this.NO_TASK_COLOR = 'yellow';
    this.listenerAlreadyRegistered = false;
    this.GetCurrentDateAcitivitiesAndTasksAndUpdateComponent();
  }

  componentDidUpdate(pProps) {
    if (pProps.date != this.props.date) {
      this.GetCurrentDateAcitivitiesAndTasksAndUpdateComponent();
    }
  }

  GetCurrentDateAcitivitiesAndTasksAndUpdateComponent = () => {
    let myDate = this.props.date;
    GetAllTasks()
      .then(allTasks_ => {
        this.allTasks = allTasks_;

        GetActivityByDay(
          myDate.getFullYear(),
          myDate.getMonth(),
          myDate.getDate(),
        )
          .then(activityThisDay_ => {
            this.activityThisDay = activityThisDay_;
            if (this.listenerAlreadyRegistered === false) {
              this.activityThisDay.addListener(this.on_change);
              this.listenerAlreadyRegistered = true;
            }
            this.CreateRingData();
            this.forceUpdate();
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };
  on_change = (name, changes) => {
    this.GetCurrentDateAcitivitiesAndTasksAndUpdateComponent();
  };

  ConvertTime2Percentage = date => {
    const min = date.getHours() * 60 + date.getMinutes();
    // console.log('eeeeeeeeeee', (min * 100) / 1440);

    return (min * 100) / 1440;
  };

  CreateRingData = () => {
    let sum = 0;
    this.state.result = [];
    for (let i = 0; i < this.activityThisDay.length; i++) {
      if (i === 0) {
        let pe = this.ConvertTime2Percentage(this.activityThisDay[i].start);
        let dur_nocolor = pe - 0;
        this.state.result.push({
          percentage: dur_nocolor,
          color: this.NO_TASK_COLOR,
        });
        sum += dur_nocolor;
      }

      let ps = this.ConvertTime2Percentage(this.activityThisDay[i].start);
      let pe = this.ConvertTime2Percentage(this.activityThisDay[i].end);
      let dur_color = pe - ps;

      let taskId = this.activityThisDay[i].taskId;
      let taskColor = null;
      this.allTasks.forEach(aTask => {
        if (aTask.id == taskId) {
          taskColor = aTask.color;
        }
      });
      this.state.result.push({
        percentage: dur_color,
        color: taskColor,
      });
      sum += dur_color;
      if (i < this.activityThisDay.length - 1) {
        let pss = this.ConvertTime2Percentage(
          this.activityThisDay[i + 1].start,
        );
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
    if (sum != 100) {
      console.log('***** ERROR ***** Sum of percentages is not 100%');
    }
    console.log('Activity Converted Date: ', sum);
    for (let i = 0; i < this.state.result.length; i++) {
      console.log('\t', this.state.result[i]);
    }
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
