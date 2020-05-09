import React, {Component} from 'react';
import {View, Text, Picker, StyleSheet} from 'react-native';
// import {connect} from 'react-redux';
import {GetAllTasks} from '../db/allSchema';

export default class TaskPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedValue: '', allTasks: []};
    GetAllTasks()
      .then(allTasks_ => {
        this.setState({allTasks: allTasks_});
        this.allTasks.addListener(this.on_change);
      })
      .catch(error => {});
  }
  on_change = (name, changes) => {
    this.forceUpdate();
  };

  render() {
    // Creating a list of `Picker.Item` native objects from `this.props.tasks`
    let pickerItemList = [];
    for (let index = 0; index < this.state.allTasks.length; index++) {
      const aTask = this.state.allTasks[index];
      pickerItemList.push(
        <Picker.Item label={aTask.name} value={aTask.name} />,
      );
    }

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.selectedValue}
          style={{
            height: 50,
            width: 270,
            borderColor: 'red',
            borderWidth: 14,
            //   backgroundColor: 'blue',
            margin: 10,
            marginLeft: 20,
            paddingHorizontal: 8,
            paddingVertical: 6,
            //   borderWidth: 3,
            //   borderColor: 'white',
            borderBottomColor: '#ddd',
            borderStyle: 'dashed',
            fontSize: 20,
            //   height: 50,
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedValue: itemValue});
          }}>
          {pickerItemList}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

// function mapStateToProps(state) {
//   return {tasks: state.TaskReducer.tasks};
// }

// export default connect(mapStateToProps)(TaskPicker);
