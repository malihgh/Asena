import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Fonts} from '../global/Fonts';
import GridChart from '../components/GridChart';
import TaskPicker from '../components/TaskPicker';

// const myHeight = Dimensions.get('window').height - 150;

export default class HistoryTask extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTaskId: -1};
  }

  render() {
    return (
      <View
        style={{
          // height: myHeight,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}>
        <View style={{flex: 1}}>
          <TaskPicker
            OnSelectFunc={id => {
              console.log('Picker changed to: ', id);
              this.setState({selectedTaskId: id});
            }}
          />
        </View>

        <View
          style={{
            flex: 2,
            // height: 250,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'blue',
          }}>
          <GridChart taskId={this.state.selectedTaskId} />
        </View>
      </View>
    );
  }
}
