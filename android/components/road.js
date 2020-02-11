import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Button, Modal, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../../sqlite.helper';

SqliteHelper.openDB();
console.disableYellowBox = true;
export default class road extends Component {
    // latitude: 16.0324246,
    // longitude: 108.2184286,

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
            isVisible: false,
            latitude: 0,
            longitude: 0,
            Listwarning: [],
            latitudeMaker: 0,
            longitudeMaker: 0,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10,
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                error: null
            });
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
    }


    onPress(data) {
        let lat = data.nativeEvent.coordinate.latitude;
        let long = data.nativeEvent.coordinate.longitude;
        this.setState({
            latitudeMaker: lat,
            longitudeMaker: long,
            region: {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        })
        // this.props.navigation.navigate('NewTTScreen')

    }

    render() {
        const navigation = this.props;
        return (

            <View style={{ flex: 1 }}>

                <MapView
                    draggable
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 8 }}
                    region={this.state.region
                    }
                    onPress={this.onPress.bind(this)}
                    zoomEnabled={true}
                >
                    <Marker coordinate={this.state} >
                        <Callout>
                            <Text style={{ fontWeight: 'bold' }}>Vị trí của bạn</Text>
                        </Callout>
                    </Marker>

                    <Marker coordinate={{
                        latitude: this.state.latitudeMaker,
                        longitude: this.state.longitudeMaker
                    }}
                        pinColor={'blue'}
                    />


                    {/* {this.state.Listwarning.length > 0 && this.state.Listwarning.map(marker => (
                        <Marker key={marker.id}
                            coordinate={marker}
                            // title={marker.range + 'm: ' + marker.value}
                            pinColor={'yellow'}
                            // description={marker.description}
                        />
                    ))} */}


                </MapView>

                <View style={{ flex: 1.5, marginTop: -35, flexDirection: "column" }}>
                    <View op style={{ flex: 0, width: 70, marginLeft: 320 }}>
                        <TouchableOpacity onPress={() => this.componentDidMount()}>
                            <Image
                                source={require('./image/compass.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View style={{ flex: 1, width: 65, justifyContent: "center", marginLeft: 10 }}>
                            <Button title='New Warning' onPress={() => this.props.navigation.navigate('NewLScreen')} />
                        </View>
                        <View style={{ flex: 2 }}>

                        </View>
                        <View>
                            <Modal
                                animationType={'slide'}
                                transparent={false}
                                visible={this.state.isVisible}
                                onRequestClose={() => {
                                    console.log('Modal has been closed.');
                                }}>
                                {/*All views of Modal*/}
                                {/*Animation can be slide, slide, none*/}
                                <View >
                                    <Text >Modal is open!</Text>
                                    <Button
                                        title="Click To Close Modal"
                                        onPress={() => {
                                            this.setState({ isVisible: !this.state.isVisible });
                                        }}
                                    />
                                </View>
                                <View>
                                        
                                </View>
                            </Modal>

                            {/*Button will change state to true and view will re-render*/}
                            <Button
                                title="Click To Open Modal"
                                onPress={() => {
                                    this.setState({ isVisible: true });
                                }}
                            />
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}