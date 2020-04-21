import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';
import AddNewTask from '../screens/addNewTask';
import ListTaskComponent from '../components/listTaskComponent';

export default class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {name: 'Reading', color: '#FFE32D'},
        {name: 'Theses', color: '#00A000'},
        {name: 'Call', color: '#FF4500'},
        {name: 'English', color: '#1E90FF'},
        {name: 'Cleaning', color: '#FF1493'},
      ],
    };
  }
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
        <View style={{flex: 1, marginTop: 5, marginBottom: 60}}>
          <FlatList
            data={this.state.tasks}
            renderItem={({item}) => (
              <ListTaskComponent name={item.name} color={item.color} />
            )}
          />
        </View>
      </View>
    );
  }
}
