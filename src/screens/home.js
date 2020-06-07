import React, {Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {Icon, Header, Right} from 'native-base';
import TaskListItem from '../components/TaskListItem';
// import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';
import {GetAllTasks, InsertActivity} from '../db/allSchema';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTaskId: -1,
      trackingTaskID: -1,
      play_pause_icon: 'play-circle',
      startTime: new Date(),
      isStarted: false,
    };
    this.getData();
    GetAllTasks()
      .then(allTasks_ => {
        this.allTasks = allTasks_;
        this.allTasks.addListener(this.on_change);
        if (this.allTasks.length === 0) {
          this.SetTaskId(-1);
        } else {
          this.SetTaskId(this.allTasks[0].id);
        }
      })
      .catch(error => {});
  }
  SetTaskId = async taskId => {
    try {
      await this.setState({selectedTaskId: taskId});
      await AsyncStorage.setItem(
        'selectedTaskId_Key',
        JSON.stringify(this.state.selectedTaskId),
      );
    } catch (err) {
      console.log(err);
    }
  };
  on_change = (name, changes) => {
    // this.SetTaskId(this.allTasks[0].id);
    this.forceUpdate();
  };

  InsertNewActivity = (taskId, start, end) => {
    InsertActivity(taskId, start, end)
      .then(() => console.log('Activity succesfull added from home'))
      .catch(error => {
        console.log(error);
      });
  };

  updateSelectedTask = async id => {
    try {
      await this.setState({selectedTaskId: id});
      await AsyncStorage.setItem(
        'selectedTaskId_Key',
        JSON.stringify(this.state.selectedTaskId),
      );
    } catch (err) {
      console.log(err);
    }

    // alert('SelectedItem: ' + this.state.selectedTaskId);
  };
  startTiming = async () => {
    try {
      // console.log('FFFFFFFFFFFFFFF:', this.state.selectedTaskId);
      if (this.allTasks.length === 0) Alert.alert('Please add new tasks');
      else if (this.state.selectedTaskId === -1)
        Alert.alert('Please select a tasks');
      else if (this.state.isStarted === false && this.allTasks.length != 0) {
        await this.setState({isStarted: true});
        await AsyncStorage.setItem(
          'isStarted_Key',
          JSON.stringify(this.state.isStarted),
        );

        await this.setState({trackingTaskID: this.state.selectedTaskId});
        await AsyncStorage.setItem(
          'trackingTaskID_Key',
          JSON.stringify(this.state.trackingTaskID),
        );

        await this.setState({startTime: new Date()});
        await AsyncStorage.setItem(
          'startTime_Key',
          JSON.stringify(this.state.startTime),
        );

        await this.setState({play_pause_icon: 'pause-circle'});
        await AsyncStorage.setItem(
          'play_pause_icon_Key',
          JSON.stringify(this.state.play_pause_icon),
        );
      } else if (this.state.isStarted === true) {
        let endTime = new Date();
        let selectedTaskInfo = null;
        this.allTasks.forEach(taskInfo => {
          if (taskInfo.id === this.state.trackingTaskID) {
            selectedTaskInfo = taskInfo;
          }
        });

        console.log(
          'New Activity id:',
          selectedTaskInfo.id,
          ' name: ',
          selectedTaskInfo.name,
          ' from: ',
          this.state.startTime,
          ' till ',
          endTime,
        );

        this.InsertNewActivity(
          selectedTaskInfo.id,
          this.state.startTime,
          endTime,
        );

        await this.setState({isStarted: false});
        await AsyncStorage.setItem(
          'isStarted_Key',
          JSON.stringify(this.state.isStarted),
        );

        await this.setState({trackingTaskID: -1});
        await AsyncStorage.setItem(
          'trackingTaskID_Key',
          JSON.stringify(this.state.trackingTaskID),
        );

        await this.setState({play_pause_icon: 'play-circle'});
        await AsyncStorage.setItem(
          'play_pause_icon_Key',
          JSON.stringify(this.state.play_pause_icon),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedTaskId_Key');
      const isStart = await AsyncStorage.getItem('isStarted_Key');
      const play_pause_icon = await AsyncStorage.getItem('play_pause_icon_Key');
      const trackingTaskID = await AsyncStorage.getItem('trackingTaskID_Key');
      const startTime = await AsyncStorage.getItem('startTime_Key');

      if (value !== null) {
        await this.setState({selectedTaskId: JSON.parse(value)});
        console.log('selectedTaskId:', value);
      }
      if (isStart !== null) {
        await this.setState({isStarted: JSON.parse(isStart)});
      }
      if (play_pause_icon !== null) {
        await this.setState({play_pause_icon: JSON.parse(play_pause_icon)});
      }
      if (trackingTaskID !== null) {
        await this.setState({trackingTaskID: JSON.parse(trackingTaskID)});
      }
      if (startTime !== null) {
        let d = JSON.parse(startTime);
        await this.setState({startTime: new Date(d)});
        // console.log('selectedTaskId:', this.state.startTime);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  render() {
    let iconStyle = {
      fontSize: 40,
      color: '#0C0C5F',
    };

    if (this.state.isStarted === true || this.state.selectedTaskId === -1) {
      iconStyle.opacity = 0.5;
    }

    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            backgroundColor: '#4A88B7',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#0C0C5F',
              fontSize: 32,
              fontFamily: Fonts.Lora,
            }}>
            Asena
          </Text>

          <Right>
            <Icon
              type="FontAwesome"
              name="plus-circle"
              style={iconStyle}
              onPress={() => {
                console.log('DDDDD:', this.allTasks.length === 0);
                if (
                  this.state.isStarted === false &&
                  this.allTasks.length != 0 &&
                  this.state.selectedTaskId != -1
                ) {
                  this.props.navigation.navigate('AddNewActivity', {
                    taskId: this.state.selectedTaskId,
                  });
                }
              }}
            />
          </Right>
        </Header>
        {/* create list */}
        <View
          style={{
            flex: 3,
          }}>
          <View
            style={{flex: 1, marginTop: 12, marginRight: 20, marginLeft: 20}}>
            <FlatList
              data={this.allTasks}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => (
                <TaskListItem
                  name={item.name}
                  color={item.color}
                  id={item.id}
                  isSelected={this.state.selectedTaskId}
                  OnSelectFunc={() => {
                    if (this.state.isStarted === false) {
                      this.updateSelectedTask(item.id);
                    }
                  }}
                />
              )}
            />
          </View>
        </View>
        {/* create play icon */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Text>selected: {this.state.selectedTaskId}</Text> */}
          {/*<Text>trackingTaskID: {this.state.trackingTaskID}</Text> */}
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="MaterialCommunityIcons"
              name={this.state.play_pause_icon}
              style={{fontSize: 110, color: '#0C0C5F'}}
              onPress={this.startTiming}
            />
          </View>
        </View>
      </View>
    );
  }
}

// function mapStateToProps(state) {
//   return {tasks: state.TaskReducer.tasks};
// }

// export default connect(mapStateToProps)(Home);
