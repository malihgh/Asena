import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';
import ActivityListComponent from '../components/ActivityListComponent';
import {connect} from 'react-redux';
import {Fonts} from '../global/Fonts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTaskId: -1,
      play_pause_icon: '',
    };
  }

  updateSelectedTask = id => {
    this.setState({selectedTaskId: id});
    // alert('SelectedItem: ' + this.state.selectedTaskId);
    this.setState({play_pause_icon: 'play-circle'});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            backgroundColor: '#4A88B7',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#0C0C5F',
              fontSize: 30,
              fontFamily: Fonts.Montserrat_Bold,
            }}>
            Asena
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
                this.props.navigation.navigate('AddNewActivity');
              }}
            />
          </Right>
        </Header>
        {/* create list */}
        <View
          style={{
            flex: 3,
          }}>
          <View
            style={{flex: 1, marginTop: 10, marginRight: 20, marginLeft: 20}}>
            <FlatList
              data={this.props.tasks}
              renderItem={({item}) => (
                <ActivityListComponent
                  name={item.name}
                  color={item.color}
                  id={item.id}
                  isSelected={this.state.selectedTaskId}
                  OnSelectFunc={() => this.updateSelectedTask(item.id)}
                />
              )}
            />
          </View>
        </View>
        {/* create play icon */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text>{this.state.selectedTaskId}</Text>
            <Icon
              type="MaterialCommunityIcons"
              name={this.state.play_pause_icon}
              style={{fontSize: 110, color: '#0C0C5F'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {tasks: state.TaskReducer.tasks};
}

export default connect(mapStateToProps)(Home);
