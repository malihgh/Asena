import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Card} from 'native-base';
import {Fonts} from '../global/Fonts';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const myColor = this.props.color;
    // console.log('color is:' + myColor);
    let itemStyle = {
      backgroundColor: myColor,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
      borderColor: '',
      borderWidth: 0,
    };

    let textStyle = {
      fontFamily: Fonts.Montserrat,
      fontSize: 20,
      color: 'black',
    };

    if (this.props.isSelected == this.props.id) {
      itemStyle.backgroundColor = 'white';
      itemStyle.height = 70;
      itemStyle.borderColor = 'black';
      itemStyle.borderWidth = 3;
      textStyle.fontFamily = Fonts.Montserrat_Bold;
    }

    return (
      <Card style={{flex: 1}}>
        <TouchableOpacity style={itemStyle} onPress={this.props.OnSelectFunc}>
          <Text style={textStyle}>{this.props.name}</Text>
        </TouchableOpacity>
      </Card>
    );
  }
}
