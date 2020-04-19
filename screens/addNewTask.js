/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Icon, Button} from 'native-base';
import ColorPalette from 'react-native-color-palette';

export default class AddNewTask extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        {/* add new task */}
        <View style={{flex: 1}}>
          <View style={{height: 200}}>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 20,
                // backgroundColor: 'red',
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
                placeholder="New task:"
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
          <View style={{height: 200}}>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginBottom: 0,
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
            <View
              style={{
                flex: 5,
                // height: 600,
                width: 320,
                // backgroundColor: 'red',
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}>
              <ColorPalette
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'blue',
                }}
                onChange={color => alert(`Color selected: ${color}`)}
                defaultColor={'#C0392B'}
                colors={[
                  '#C0392B',
                  '#E74C3C',
                  '#9B59B6',
                  '#8E44AD',
                  '#2980B9',
                  '#66FF66',
                  '#55A2DC',
                  '#FFCC33',
                  '#FF6633',
                  '#9B59B6',
                  '#8E44AD',
                  '#9B59B6',
                  '#8E44AD',
                  '#2980B9',
                  '#66FF66',
                  '#55A2DC',
                  '#FFCC33',
                  '#FF6633',
                ]}
                title={''}
                // icon={
                //   <Text>✔</Text>︎
                //   // Icon can just be text or ASCII
                // }
              />
              {/* <Text>select color</Text> */}
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
                backgroundColor: '#4A88B7',
              }}>
              <Text style={{color: '#0C0C5F', fontWeight: 'bold'}}>CANCLE</Text>
            </Button>
            <Button
              style={{
                padding: 25,
                margin: 10,
                marginLeft: 20,
                backgroundColor: '#4A88B7',
              }}>
              <Text style={{color: '#0C0C5F', fontWeight: 'bold'}}>Save</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
