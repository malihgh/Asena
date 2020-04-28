import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card, CardItem, Icon, Left, Right} from 'native-base';
import {connect} from 'react-redux';

class ListTaskComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const myColor = this.props.color;
    // console.log('color is:' + myColor);
    return (
      <View>
        <Card transparent style={styles.container}>
          {/* color */}
          <CardItem style={styles.color}>
            <View
              style={{
                borderRadius: 20,
                width: 38,
                height: 38,
                backgroundColor: myColor,
                borderColor: '#323232',
                borderWidth: 2,
              }}
            />
          </CardItem>
          {/* name */}
          <CardItem style={styles.body}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {this.props.name}
            </Text>
          </CardItem>
          {/* trash */}
          <CardItem style={styles.trash}>
            <Icon
              type="Ionicons"
              name="md-trash"
              onPress={() => {
                this.props.deleteTask(this.props.id);
              }}
              style={{fontSize: 33, alignSelf: 'center', marginLeft: 4}}
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

    // backgroundColor: '#DAD5D5',
    // margin: 2,
    // borderLeftWidth: 2,
    // borderLeftColor: '#CCCCCC',
  },
  color: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,

    // backgroundColor: '#DAD5D5',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: id => {
      dispatch({type: 'TASK_DEL', id: id});
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ListTaskComponent);
