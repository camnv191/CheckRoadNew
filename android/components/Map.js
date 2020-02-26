import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, StyleSheet } from 'react-native-maps';
import { Text, Image } from 'react-native'

export default class Map extends Component {
    render() {
        return (
            <MapView
                style={{width: '100%',
                height: "100%"}}
                draggable
                provider={PROVIDER_GOOGLE}
                region={this.props.region}
                onPress={this.props.newLocation} >

                <Marker coordinate={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude
                }}>

                    <Callout>
                        <Text style={{ fontWeight: 'bold' }}>Vị trí của bạn</Text>
                    </Callout>
                </Marker>

                <Marker
                    pinColor={'blue'}
                    coordinate={{
                        latitude: this.props.latitudeMaker,
                        longitude: this.props.longitudeMaker
                    }} />


                {this.props.warning.length > 0 && this.props.warning.map(marker => (
                    <Marker
                        coordinate={marker}
                        title={marker.name} >
                        <Image
                            source={{ uri: marker.icon }}
                            style={{ width: 30, height: 30 }} />
                    </Marker>
                ))}
            </MapView>
        )
    }
}