import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Button, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../../sqlite.helper';

SqliteHelper.openDB();

export default class road extends Component {
    // latitude: 16.0324246,
    //     longitude: 108.2184286,

    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        const { keyword } = this.state;
        let temp = await SqliteHelper.getWarning(keyword);
        for (let i = 0; i < temp.rows.length; i++) {
            const item = temp.rows.item(i);
            listTemp.push(item);
        };
        this.setState({
            Listwarning: listTemp
        });
    }
    constructor(props) {

        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            Listwarning: [],

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
                    style={{ flex: 8 }}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                    <Marker coordinate={this.state} >
                        <Callout>
                            <Text style={{ fontWeight: 'bold' }}>Vị trí của bạn</Text>
                        </Callout>
                    </Marker>
                    {/* <FlatList
                        data={this.state.Listwarning}
                        renderItem={({ item }) => (
                            <Marker
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude:item.longitude,
                        }}
                                image={require('./image/fender-bender.png')}
                            >
                                <Callout>
                                    <Text style={{ color: 'red', fontWeight: "bold" }}>Nơi thường xuyên xảy ra tai nạn</Text>
                                </Callout>
                            </Marker>
                        )
                        }
                    /> */}
                     {this.state.Listwarning.length > 0 && this.state.Listwarning.map(marker => (
                            <Marker
                            coordinate={marker}
                            title = {marker.value}
                            pinColor={'yellow'}
                            description={marker.description}
                            />
                        ))}


                </MapView>

                <View style={{ flex: 1.5, marginTop: -34, flexDirection: "column" }}>
                    <View style={{ flex: 0, width: 70, marginLeft: 310 }}>
                        <Button style={{ flex: 1 }} title={'Về giữa'}
                            onPress={() =>
                                this.componentDidMount()
                            }
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View style={{ flex: 1, width: 65, justifyContent:"center", marginLeft:10 }}>
                            <Button title='New Warning' onPress={() => this.props.navigation.navigate('NewLScreen')} />
                        </View>
                        <View style={{ flex: 2 }}>
                            
                        </View>
                        <View style={{ flex: 1, width: 65, justifyContent:"center", marginRight:10 }}>
                            <Button title='New Location' onPress={() => this.props.navigation.navigate('NewTTScreen')} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
