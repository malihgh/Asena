import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';
import AddNewTask from '../screens/addNewTask';
import ListTaskComponent from '../components/ListTaskComponent';
import {connect} from 'react-redux';

class ListTasks extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#4A88B7', alignItems: 'center'}}>
          <Text style={{color: '#0C0C5F', fontSize: 30, fontWeight: 'bold'}}>
            Tasks
          </Text>
          <Right>
            <Icon
              type="FontAwesome"
              name="plus-circle"
              style={{
                fontSize: 40,
                color: '#0C0C5F',
              }}
              onPress={() => {
                this.props.navigation.navigate('AddNewTask');
              }}
            />
          </Right>
        </Header>
        <View style={{flex: 1, marginTop: 5}}>
          <FlatList
            data={this.props.tasks}
            renderItem={({item}) => (
              <ListTaskComponent
                name={item.name}
                color={item.color}
                id={item.id}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {tasks: state.TaskReducer.tasks};
}

export default connect(mapStateToProps)(ListTasks);
