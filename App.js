import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  state = {
    coordinates: [
      { name: '1', latitude: 16.03301569, longitude: 108.20963072 },
      { name: '2', latitude: 16.03992322, longitude: 108.2141326 },
      { name: '3', latitude: 16.03627972, longitude: 108.22637455 },
      { name: '4', latitude: 16.02944797, longitude: 108.22226757 },
      { name: '5', latitude: 16.02982752, longitude: 108.21294789 },
    ]
  }

  showWelcomeMessage = () => {
    Alert.alert(
      'Welcome to street',
      'The policeman',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK'
        }
      ]
    )
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 16.0324246,
          longitude: 108.2184286,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }} >
        <Marker
          draggable
          coordinate={{ latitude: 16.0324246, longitude: 108.2184286 }}>

          <Callout onPress={this.showWelcomeMessage}>
            <Image style={{ height: 100, width: 50 }} source={require('./android/components/image/police.jpg')} />
            <Text>police</Text>
          </Callout>
        </Marker>
        {
          this.state.coordinates.map(maker => (
            <Marker
              key={maker.name}
              coordinate={{ latitude: maker.latitude, longitude: maker.longitude }}
              title={maker.name}
            >
              <Callout>
                <Image style={{ height: 100, width: 50 }} source={require('./android/components/image/police.jpg')} />
          <Text>{maker.name}</Text>
              </Callout>

            </Marker>
          ))
        }

      </MapView >
    )
  }
}
const styles = StyleSheet.create({
  map: {
    height: '100%'
  }
})
