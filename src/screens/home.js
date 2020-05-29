import React, {Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {Icon, Header, Right} from 'native-base';
import TaskListItem from '../components/TaskListItem';
// import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';
import {GetAllTasks, InsertActivity} from '../db/allSchema';

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

    GetAllTasks()
      .then(allTasks_ => {
        this.allTasks = allTasks_;
        this.allTasks.addListener(this.on_change);
        this.setState({selectedTaskId: this.allTasks[0].id});
      })
      .catch(error => {});
  }

  on_change = (name, changes) => {
    this.forceUpdate();
  };

  InsertNewActivity = (taskId, start, end) => {
    InsertActivity(taskId, start, end)
      .then(() => console.log('Activity succesfull added from home'))
      .catch(error => console.log(error));
  };

  updateSelectedTask = id => {
    this.setState({selectedTaskId: id});
    // alert('SelectedItem: ' + this.state.selectedTaskId);
  };
  render() {
    let iconStyle = {
      fontSize: 40,
      color: '#0C0C5F',
    };

    if (this.state.isStarted === true) {
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
              fontSize: 30,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
            Asena
          </Text>

          <Right>
            <Icon
              type="FontAwesome"
              name="plus-circle"
              style={iconStyle}
              onPress={() => {
                if (this.state.isStarted === false) {
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
            style={{flex: 1, marginTop: 10, marginRight: 20, marginLeft: 20}}>
            <FlatList
              data={this.allTasks}
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
          {/* <Text>selected: {this.state.selectedTaskId}</Text>
          <Text>trackingTaskID: {this.state.trackingTaskID}</Text> */}
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="MaterialCommunityIcons"
              name={this.state.play_pause_icon}
              style={{fontSize: 110, color: '#0C0C5F'}}
              onPress={() => {
                if (this.allTasks.length == 0)
                  Alert.alert('Please add new tasks');
                else if (
                  this.state.isStarted === false &&
                  this.allTasks.length != 0
                ) {
                  this.setState({isStarted: true});
                  this.setState({trackingTaskID: this.state.selectedTaskId});
                  this.setState({startTime: new Date()});
                  this.setState({play_pause_icon: 'pause-circle'});
                } else if (this.state.isStarted === true) {
                  let endTime = new Date();
                  let selectedTaskInfo = null;
                  this.allTasks.forEach(taskInfo => {
                    if (taskInfo.id == this.state.trackingTaskID) {
                      selectedTaskInfo = taskInfo;
                    }
                  });

                  // console.log(
                  //   'New Activity id:',
                  //   selectedTaskInfo.id,
                  //   ' name: ',
                  //   selectedTaskInfo.name,
                  //   ' from: ',
                  //   this.state.startTime,
                  //   ' till ',
                  //   endTime,
                  // );
                  //InsertActivity()
                  InsertActivity(
                    selectedTaskInfo.id,
                    this.state.startTime,
                    endTime,
                  );

                  this.setState({isStarted: false});
                  this.setState({trackingTaskID: -1});
                  this.setState({play_pause_icon: 'play-circle'});
                }
              }}
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
