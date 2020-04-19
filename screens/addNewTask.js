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

// const myheight = Dimensions.get('window').height - 450;

export default class AddNewTask extends Component {
  static navigationOptions = {
    title: 'Add new task',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 25},
  };
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
                marginBottom: 25,
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
          <View style={{height: 230}}>
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
                // height: 100,
                marginTop: 10,
                width: 320,
                // backgroundColor: 'red',
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}>
              <ColorPalette
                onChange={color => alert(`Color selected: ${color}`)}
                defaultColor={'#FFE32D'}
                colors={[
                  '#FFE32D',
                  '#FFA500',
                  '#FF4500',
                  '#FF0000',

                  '#00FF00',
                  '#00A000',
                  '#006600',

                  '#32FCFC',
                  '#1FF6AF',
                  '#1E90FF',
                  '#2828F9',

                  '#FC1FFC',
                  '#FF1493',
                  '#C71585',
                  '#7C1E7C',

                  '#C0C0C0',
                  '#808080',
                  '#606060',
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
              // flex: 1,
              height: 120,
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <Button
              style={{
                padding: 18,
                margin: 10,
                marginRight: 20,
                backgroundColor: '#4A88B7',
              }}
              onPress={() => this.props.navigation.goBack()}>
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
