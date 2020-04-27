import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';
import ActivityListComponent from '../components/ActivityListComponent';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {id: 1, name: 'Reading', color: '#FFE32D'},
        {id: 2, name: 'Theses', color: '#00A000'},
        {id: 3, name: 'Call', color: '#FF4500'},
        {id: 4, name: 'English', color: '#1E90FF'},
        {id: 5, name: 'Cleaning', color: '#FF1493'},
        {id: 6, name: 'Call', color: '#FF4500'},
        {id: 7, name: 'English', color: '#1E90FF'},
        {id: 8, name: 'Cleaning', color: '#FF1493'},
      ],
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
          <Text style={{color: '#0C0C5F', fontSize: 30, fontWeight: 'bold'}}>
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
              data={this.state.tasks}
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
        {/* create icon */}
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

// export default class Home extends Component {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <View style={styles.taskManager}>
//           <View style={styles.selectTask}>
//             <TextInput
//               placeholder="write Task"
//               style={{
//                 flexGrow: 1,
//                 marginRight: 30,
//                 paddingHorizontal: 8,
//                 paddingVertical: 6,
//                 borderWidth: 3,
//                 borderColor: '#ddd',
//                 borderStyle: 'dashed',
//                 fontSize: 20,
//               }}
//             />
//           </View>

//           <View
//             style={{
//               flex: 1,
//               marginRight: 20,
//               height: 35,
//             }}>
//             <Button
//               transparent
//               style={{
//                 height: 35,
//                 justifyContent: 'center',
//               }}>
//               <Icon
//                 type="FontAwesome"
//                 name="play"
//                 style={{fontSize: 25, color: 'black'}}
//               />
//             </Button>
//           </View>
//         </View>
//         <View style={styles.clock}>
//           <Text style={{fontSize: 30}}>clock</Text>
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   taskManager: {
//     flex: 1,
//     flexDirection: 'row',
//     // backgroundColor: 'red',
//     // height: 60,
//     alignItems: 'center',
//   },
//   clock: {
//     flex: 5,
//     height: 170,
//     margin: 20,
//     // width: 240,
//     backgroundColor: 'blue',
//     // justifyContent: 'flex-end',
//     alignSelf: 'stretch',
//     // alignItems: 'stretch',
//   },
//   selectTask: {
//     flex: 4,
//     // backgroundColor: 'green',
//     margin: 20,
//     height: 35,
//   },
// });
