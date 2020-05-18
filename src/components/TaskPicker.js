import React, {Component} from 'react';
import {View, Text, Picker, StyleSheet} from 'react-native';
// import {connect} from 'react-redux';
import {GetAllTasks} from '../db/allSchema';

export default class TaskPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedValue: ''};
    this.listenerAlreadyRegistered = false;
    console.log('Constructor TaskPicker ...');
    this.UpdateListOfTaskFromDB();
    this.allTasks = [];
  }

  UpdateListOfTaskFromDB = () => {
    GetAllTasks()
      .then(allTasks_ => {
        console.log('Constructor TaskPicker ==> UpdateListOfTaskFromDB');
        this.allTasks = allTasks_;
        if (this.allTasks.length > 0)
          this.state.selectedValue = this.allTasks[0].id;
        if (this.listenerAlreadyRegistered === false) {
          this.allTasks.addListener(this.on_change);
          this.listenerAlreadyRegistered = true;
        }
        this.forceUpdate();
      })
      .catch(error => {
        console.log('Failed: ', error);
      });
  };
  on_change = (name, changes) => {
    this.UpdateListOfTaskFromDB();
  };

  render() {
    // Creating a list of `Picker.Item` native objects from `this.props.tasks`
    let pickerItemList = [];
    for (let index = 0; index < this.allTasks.length; index++) {
      const aTask = this.allTasks[index];
      pickerItemList.push(<Picker.Item label={aTask.name} value={aTask.id} />);
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
            //console.log('value: ', itemValue, '  index:', itemIndex);
            this.setState({selectedValue: itemValue});
            this.props.OnSelectFunc(itemValue);
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
