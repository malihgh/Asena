import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Fonts} from '../global/Fonts';
import ActivityListComponent from '../components/ActivityListComponent';
import {GetActivityByDay, GetAllTasks} from '../db/allSchema';

export default class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
    this.allTasks = null;
    this.activityThisDay = null;
    this.GetCurrentDateAcitivitiesAndTasksAndUpdateComponent();
  }
  static navigationOptions = {
    title: 'Edit activity',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };

  // Call this method only once
  GetCurrentDateAcitivitiesAndTasksAndUpdateComponent = () => {
    // new Date()
    let myDate = this.props.navigation.getParam('date');
    // this.props.navigation.getParam('date');
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
            this.activityThisDay.addListener(this.on_change);
            this.UpdateActivityList();
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  on_change = (name, changes) => {
    this.UpdateActivityList();
  };
  UpdateActivityList = () => {
    this.setState({result: []});
    for (let i = 0; i < this.activityThisDay.length; i++) {
      let taskId = this.activityThisDay[i].taskId;
      let taskColor = null;
      let taskName = null;
      this.allTasks.forEach(aTask => {
        if (aTask.id === taskId) {
          taskColor = aTask.color;
          taskName = aTask.name;
        }
      });
      this.state.result.push({
        taskName: taskName,
        taskColor: taskColor,
        startDate: this.activityThisDay[i].start,
        endDate: this.activityThisDay[i].end,
        activityId: this.activityThisDay[i].id,
      });
    }
    this.forceUpdate();
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
        <FlatList
          data={this.state.result}
          keyExtractor={(item, index) => item.activityId}
          renderItem={({item}) => (
            <ActivityListComponent
              taskName={item.taskName}
              taskColor={item.taskColor}
              startDate={item.startDate}
              endDate={item.endDate}
              activityId={item.activityId}
            />
          )}
        />
      </View>
    );
  }
}
