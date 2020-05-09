import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Icon, Header, Right} from 'native-base';
import ListTaskComponent from '../components/ListTaskComponent';
import {Fonts} from '../global/Fonts';
import {GetAllTasks} from '../db/allSchema';

export default class ListTasks extends Component {
  constructor(props) {
    super(props);

    GetAllTasks()
      .then(allTasks_ => {
        console.log('DB succeeded to return all tasks!');
        this.allTasks = allTasks_;
        this.allTasks.addListener(this.on_change);
      })
      .catch(error => {
        console.log('DB failed to return all tasks!');
      });
  }
  on_change = (name, changes) => {
    this.forceUpdate();
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#4A88B7', alignItems: 'center'}}>
          <Text
            style={{
              color: '#0C0C5F',
              fontSize: 30,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
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
            data={this.allTasks}
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
