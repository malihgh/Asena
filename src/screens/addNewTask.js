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
  Alert,
} from 'react-native';
import {Icon, Button} from 'native-base';
import ColorPalette from 'react-native-color-palette';
import {Fonts} from '../global/Fonts';
import {colors} from '../global/colors';
import {InsertNewTask, GetAllTasks} from '../db/allSchema';

const myheight = Dimensions.get('window').height - 430;

export default class AddNewTask extends Component {
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
      // defaultColor: colors[1],
      usedNames: [],
      ERROR_TEXT: 'This name is already used!',
      showErrorText: false,
    };

    GetAllTasks()
      .then(allTasks_ => {
        console.log('DB Success');
        let notUsedColor = colors;
        allTasks_.forEach(aTask => {
          this.setState({usedNames: [...this.state.usedNames, aTask.name]});
          notUsedColor = notUsedColor.filter(color => color != aTask.color);
          console.log(notUsedColor.length);
          console.log(this.state.usedNames);
        });
        this.setState({
          colorList: notUsedColor,
        });
        console.log('colorList', this.state.colorList[0]);
        if (notUsedColor.length > 0) this.setState({color: notUsedColor[3]});
      })
      .catch(error => {
        console.log('DB failed to return all tasks!');
      });
  }
  InsertTask = () => {
    InsertNewTask(this.state.name, this.state.color)
      .then(newTask => {
        console.log('succed add task', newTask);
      })
      .catch(error => {
        console.log('oK!');
        console.log(this.state.name);
        console.log(this.state.color);
        console.log('cant add task', error);
      });
    this.props.navigation.goBack();
  };

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
                  //console.log(text);
                  if (this.state.usedNames.includes(text))
                    this.setState({showErrorText: true});
                  else this.setState({showErrorText: false});
                }}
                style={styles.newTaskInput}
              />
              {this.state.showErrorText && (
                <Text style={{color: 'red', marginLeft: 20, fontSize: 16}}>
                  {this.state.ERROR_TEXT}
                </Text>
              )}
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
                  //this.setState({color: color});
                }}
                defaultColor={this.state.color}
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
              style={[
                styles.saveButtonn,
                {
                  opacity:
                    this.state.name == '' || this.state.colorList.length == 0
                      ? 0.5
                      : 1,
                },
              ]}
              onPress={this.InsertTask}
              disabled={
                this.state.name == '' || this.state.colorList.length == 0
              }>
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
  saveButtonn: {
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
