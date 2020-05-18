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
        <TaskPicker
          OnSelectFunc={id => {
            console.log('Picker changed to: ', id);
            this.setState({selectedTaskId: id});
          }}
        />

        <View
          style={{
            height: 300,
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
const styles = StyleSheet.create({
  taskInput: {
    // flexGrow: 1,
    // marginRight: 30,
    flex: 2,
    margin: 10,
    marginLeft: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 3,
    borderColor: 'white',
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    fontSize: 20,
    height: 50,
    // backgroundColor: 'black',
  },
  btn: {
    padding: 25,
    margin: 12,

    backgroundColor: '#4A88B7',
    marginRight: 15,
    // backgroundColor: 'red',
    height: 46,
  },
  writte: {
    fontSize: 20,
    color: '#0C0C5F',
    fontWeight: 'bold',
  },
});
