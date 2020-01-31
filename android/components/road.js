import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Button, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import TestDB from '../../Testdatabase'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'warning.db' });

export default class road extends Component {
    // latitude: 16.0324246,
    //     longitude: 108.2184286,
    states = {
        coordinates: [
            { name: '1', latitude: 16.03301569, longitude: 108.20963072 },
            { name: '2', latitude: 16.03992322, longitude: 108.2141326 },
            { name: '3', latitude: 16.03627972, longitude: 108.22637455 },
            { name: '4', latitude: 16.02944797, longitude: 108.22226757 },
            { name: '5', latitude: 16.02982752, longitude: 108.21294789 },
        ]
    }
    statenh = {
        coordinatess: [
            { name: '1', latitude: 16.0380619, longitude: 108.21928788 },
            { name: '2', latitude: 16.03935451, longitude: 108.21084453 },
            { name: '3', latitude: 16.05095169, longitude: 108.20923805 },
            { name: '4', latitude: 16.03608707, longitude: 108.18428159 },
            { name: '5', latitude: 16.0202518, longitude: 108.19418198 },
        ]
    }
    constructor(props) {
        super(props);

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT SELECT * FROM warninginfo'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
        this.state = {
            latitude: 0,
            longitude: 0
        }
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
        const navigation = this.props;
        return (

            <View style={{ flex: 1 }}>
                <MapView
                    draggable
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 7 }}
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
                                title={'Nơi thường xuyên bắn tốc độ'}
                                image={require('./image/policeman.png')}
                            >
                                <Callout>
                                    <Text>Nơi thường xuyên bắn tốc độ</Text>
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
                                    <Text style={{ color: 'red', fontWeight: "bold" }}>Nơi thường xuyên xảy ra tai nạn</Text>
                                </Callout>
                            </Marker>
                        ))
                    }

                    {
                        <FlatList
                            data={this.state.Listwarning}
                            renderItem={({ item }) =>
                                console.log(ss)
                                    (

                                        <View>
                                            <Text>ID: {item.id}</Text>
                                            <Text>Name: {item.name}</Text>
                                            <Text>Latitude: {item.latitude}</Text>
                                            <Text>Longitude:{item.longitude}</Text>
                                        </View>
                                    )}
                        />
                    }




                </MapView>
                <View style={{ flex: 3, marginTop: -34, flexDirection: "column" }}>
                    <View style={{ flex: 0, width: 70, marginLeft: 310 }}>
                        <Button style={{ flex: 1 }} title={'Về giữa'}
                            onPress={() =>
                                this.componentDidMount()
                            }
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View style={{ flex: 1, width: 65, }}>
                            <Button title='New' onPress={() => this.props.navigation.navigate('NewTTScreen')} />
                        </View>
                        <View style={{ flex: 2 }}>
                        </View>
                        <View style={{ flex: 1 }}>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
