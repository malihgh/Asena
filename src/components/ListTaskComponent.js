import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Card, CardItem, Icon, Left, Right} from 'native-base';
import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';
import {DeleteTaskById} from '../db/allSchema';

class ListTaskComponent extends Component {
  constructor(props) {
    super(props);
  }
  //  alert for delete
  createTwoButtonAlert = () =>
    Alert.alert(
      'Deleting ' + this.props.name,
      'Are you sure want to delete ' + this.props.name + '?',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteTask(this.props.id);

            DeleteTaskById(this.props.id)
              .then(taskId => {
                console.log('Task ' + taskId + ' successfully deleted');
              })
              .catch(error => {
                console.log('Error while deleting task');
              });
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

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
                borderWidth: 1,
              }}
            />
          </CardItem>
          {/* name */}
          <CardItem style={styles.body}>
            <Text style={styles.text}>{this.props.name}</Text>
          </CardItem>
          {/* trash */}
          <CardItem style={styles.trash}>
            <Icon
              type="Ionicons"
              name="md-trash"
              onPress={this.createTwoButtonAlert}
              style={styles.icon}
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
    marginRight: 8,
    marginLeft: 8,
  },
  trash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 15,
  },
  color: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,

    // backgroundColor: '#DAD5D5',
  },
  icon: {
    fontSize: 33,
    alignSelf: 'center',
    marginLeft: 4,
  },
  text: {
    fontSize: 17,
    fontFamily: Fonts.Montserrat_Bold,
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
