import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Road from './android/components/road';
import NewL from './android/components/NewWarning'

const homeNavi = createStackNavigator({

  MapScreen: {
    screen: Road,
    navigationOptions: () => ({
      headerShown: false
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