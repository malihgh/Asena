import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Icon, Left, Right} from 'native-base';

export default class ActivityListComponent extends Component {
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
    };
    if (this.props.isSelected == this.props.id)
      itemStyle.backgroundColor = 'white';

    return (
      <Card style={{flex: 1}}>
        <TouchableOpacity style={itemStyle} onPress={this.props.OnSelectFunc}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  body: {},
});
