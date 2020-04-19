/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon, Button} from 'native-base';
export default class AddNewTask extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        {/* add new task */}
        <View style={{flex: 1}}>
          <View style={{flex: 3, height: 100}}>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon
                type="FontAwesome"
                name="tasks"
                style={{
                  marginLeft: 20,
                  marginRight: 10,
                  fontSize: 25,
                  color: '#808080',
                }}
              />
              <Text style={{fontSize: 20, color: '#808080'}}>New task</Text>
            </View>
            <View
              style={{
                flex: 5,
              }}>
              <TextInput
                placeholder="New task"
                style={{
                  // flexGrow: 1,
                  // marginRight: 30,
                  margin: 20,
                  marginTop: 10,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderWidth: 3,
                  borderColor: 'white',
                  borderBottomColor: '#ddd',
                  borderStyle: 'dashed',
                  fontSize: 20,
                  height: 50,
                  // backgroundColor: 'black',
                }}
              />
            </View>
          </View>
          {/* add new color */}
          <View style={{flex: 5}}>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon
                name="md-color-palette"
                style={{
                  marginLeft: 20,
                  marginRight: 10,
                  fontSize: 40,
                  color: '#808080',
                }}
              />
              <Text style={{fontSize: 20, color: '#808080'}}>Color</Text>
            </View>
            <View style={{flex: 5, backgroundColor: '#66FF66'}}>
              <Text>select color</Text>
            </View>
          </View>
          {/* save and CANCLE button */}
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              padding: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              style={{
                padding: 18,
                margin: 10,
                marginRight: 20,
                backgroundColor: '#000',
              }}>
              <Text style={{color: '#FF8000', fontWeight: 'bold'}}>CANCLE</Text>
            </Button>
            <Button
              style={{
                padding: 25,
                margin: 10,
                marginLeft: 20,
                backgroundColor: '#FF8000',
              }}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>Save</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
