import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button, Icon, Header, Right} from 'native-base';

export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Asena',
    headerStyle: {
      backgroundColor: '#4A88B7',
    },
    headerTintColor: '#0C0C5F',
    headerTitleStyle: {fontSize: 30},

    headerRight: (
      <Icon
        type="FontAwesome"
        name="plus-circle"
        style={{fontSize: 40, color: '#0C0C5F', marginRight: 10}}
        onPress={() => {
          navigation.navigate('AddNewActivity');
        }}
      />
    ),
  });
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          type="FontAwesome"
          name="plus-circle"
          style={{fontSize: 40, color: '#0C0C5F', marginRight: 10}}
          onPress={() => {
            this.props.navigation.navigate('AddNewActivity');
          }}
        />

        <Text style={{fontSize: 48}}>Home</Text>
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
