import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card, CardItem, Icon, Left, Right} from 'native-base';

export default class ListTaskComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const myColor = this.props.color;
    console.log('color is:' + myColor);
    return (
      <View>
        <Card style={styles.container}>
          <CardItem style={styles.trash}>
            <Icon
              type="Ionicons"
              name="md-trash"
              style={{fontSize: 33, alignSelf: 'center', marginLeft: 4}}
            />
          </CardItem>
          <CardItem style={styles.body}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {this.props.name}
            </Text>
          </CardItem>
          <CardItem style={styles.color}>
            <View
              style={{
                borderRadius: 20,
                width: 38,
                height: 38,
                backgroundColor: myColor,
              }}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  trash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 15,
    backgroundColor: '#CCCCCC',
    margin: 2,
  },
  color: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleColor: {
    borderRadius: 20,
    width: 38,
    height: 38,
    // backgroundColor: ,
  },
});
