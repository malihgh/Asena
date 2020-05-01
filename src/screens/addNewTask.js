/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Icon, Button} from 'native-base';
import ColorPalette from 'react-native-color-palette';
import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';
import {colors} from '../global/colors';

const myheight = Dimensions.get('window').height - 430;

class AddNewTask extends Component {
  static navigationOptions = {
    title: 'Add new task',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25, fontFamily: Fonts.Montserrat_Bold},
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: colors[0],
      colorList: colors,
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        {/* add new task */}
        <View style={{flex: 1}}>
          <View style={{height: 180}}>
            <View style={styles.newTaskContainer}>
              <Icon type="FontAwesome" name="tasks" style={styles.taskIcon} />
              <Text style={styles.taskText}>New task</Text>
            </View>
            <View style={{flex: 5}}>
              <TextInput
                placeholder="New task"
                value={this.state.name}
                onChangeText={text => {
                  this.setState({name: text});
                }}
                style={styles.newTaskInput}
              />
            </View>
          </View>
          {/* add new color */}
          <View style={{height: 200}}>
            <View style={styles.colorContainer}>
              <Icon name="md-color-palette" style={styles.colorIcon} />
              <Text style={styles.colorText}>Color</Text>
            </View>
            <View style={styles.colorPaletteContainer}>
              <ColorPalette
                onChange={color => {
                  this.setState({color: color});
                }}
                defaultColor={'#FFE32D'}
                colors={this.state.colorList}
                title={''}
              />
            </View>
          </View>
          {/* save and CANCLE button */}
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.cancleButton}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.cancleText}>CANCLE</Text>
            </Button>
            <Button
              style={styles.saveButton}
              onPress={() => {
                this.props.addNewTask(this.state.name, this.state.color);
                this.props.navigation.goBack();
              }}
              disabled={Boolean(this.state.name == '')}>
              <Text style={styles.saveText}>Save</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  newTaskContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 18,
    // backgroundColor: 'red',
  },
  taskIcon: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 25,
    color: '#808080',
  },
  taskText: {
    fontSize: 20,
    color: '#808080',
  },
  newTaskInput: {
    // flexGrow: 1,
    // marginRight: 30,
    margin: 20,
    marginTop: 10,
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
  colorContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  colorIcon: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 40,
    color: '#808080',
  },
  colorText: {
    fontSize: 20,
    color: '#808080',
  },
  colorPaletteContainer: {
    flex: 5,
    marginTop: 10,
    width: 320,
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    // flex: 1,
    height: myheight,
    flexDirection: 'row',
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  cancleButton: {
    padding: 18,
    margin: 10,
    marginRight: 20,
    backgroundColor: '#4A88B7',
  },
  cancleText: {
    color: '#0C0C5F',
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 25,
    margin: 10,
    marginLeft: 20,
    backgroundColor: '#4A88B7',
  },
  saveText: {
    color: '#0C0C5F',
    fontWeight: 'bold',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addNewTask: (name, color) => {
      dispatch({type: 'TASK_ADD', name: name, color: color});
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(AddNewTask);
