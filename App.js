import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Road from './android/components/road';
import NewL from './android/components/NewL';
import Warning from './android/components/Listwarning'
import location from './android/components/ListLocation'
import custom from './android/components/Custom'

const homeNavi = createStackNavigator({

  MapScreen: {
    screen: Road,
    navigationOptions: () => ({
      headerShown: false
    })
  },

  WarningScreen: {
    screen: Warning,
    navigationOptions: () => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
      headerTintColor: 'green',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    })
  },
  LocationScreen: {
    screen: location,
    navigationOptions: () => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
      headerTintColor: 'green',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    })
  },

  CustomScreen: {
    screen: custom,
    navigationOptions: () => ({
      title: 'CHỌN CẢNH BÁO MUỐN HIỂN THỊ',
      headerStyle: {
        height: 40,
      },
      headerTintColor: 'red',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    })
  },

  NewLScreen: {
    screen: NewL,
    navigationOptions: () => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
      headerTintColor: 'green',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    })
  },

},
  {
    initialRouteName: 'MapScreen'
  })
const AppContai = createAppContainer(homeNavi);
export default class App extends Component {
  render() {
    return (
      <AppContai />
    )
  }
}