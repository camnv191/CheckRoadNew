import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class road extends Component {
    states = {
        coordinates: [
            { name: 'Nơi công an thường xuyên bắn tốc độ', latitude: 16.03301569, longitude: 108.20963072 },
            { name: 'Nơi công an thường xuyên bắn tốc độ', latitude: 16.03992322, longitude: 108.2141326 },
            { name: 'Nơi công an thường xuyên bắn tốc độ', latitude: 16.03627972, longitude: 108.22637455 },
            { name: 'Nơi công an thường xuyên bắn tốc độ', latitude: 16.02944797, longitude: 108.22226757 },
            { name: 'Nơi công an thường xuyên bắn tốc độ', latitude: 16.02982752, longitude: 108.21294789 },
        ]
    }
    statenh = {
        coordinatess: [
            { name: 'đoạn đường thường xuyên xảy ra tai nạn', latitude: 16.0380619, longitude: 108.21928788 },
            { name: 'đoạn đường thường xuyên xảy ra tai nạn', latitude: 16.03935451, longitude: 108.21084453 },
            { name: 'đoạn đường thường xuyên xảy ra tai nạn', latitude: 16.05095169, longitude: 108.20923805 },
            { name: 'đoạn đường thường xuyên xảy ra tai nạn', latitude: 16.03608707, longitude: 108.18428159 },
            { name: 'đoạn đường thường xuyên xảy ra tai nạn', latitude: 16.0202518, longitude: 108.19418198 },
        ]
}
constructor(props) {
    super(props);
    this.state = {
        latitude: 0,
        longitude: 0
    }
    // var taskToDO = () => {
    //     this.componentDidMount();
    // };
    // const timeLoad = 10000;
    // setInterval(taskToDO, timeLoad)

}
componentDidMount() {
    Geolocation.getCurrentPosition(position => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
        });
    },
        error => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
}

render() {
    return (
        <MapView
            draggable
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}>
            <Marker coordinate={this.state} >
                <Callout>
                    <Image style={{ height: 50, width: 100 }} source={require('./image/paracel.png')} />
                    <Text style={{ fontWeight: 'bold' }}>Paracel Company</Text>
                </Callout>
            </Marker>
            {
                this.states.coordinates.map(maker => (
                    <Marker
                        key={maker.name}
                        coordinate={{ latitude: maker.latitude, longitude: maker.longitude }}
                        title={maker.name}
                        image={require('./image/policeman.png')}
                    >
                        <Callout>
                            <Text>{maker.name}</Text>
                        </Callout>

                    </Marker>
                ))
            }
            {
                this.statenh.coordinatess.map(maker => (
                    <Marker
                        key={maker.name}
                        coordinate={{ latitude: maker.latitude, longitude: maker.longitude }}
                        title={maker.name}
                        image={require('./image/fender-bender.png')}
                    >
                        <Callout>
                            <Text>{maker.name}</Text>
                        </Callout>
                    </Marker>
                ))
            }
        </MapView>
    )
}
}
