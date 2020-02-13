import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, TextInput, Button, Modal, StyleSheet, FlatList, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../../sqlite.helper';
import ModalDropdown from 'react-native-modal-dropdown';
import DeviceInfo from 'react-native-device-info';


SqliteHelper.openDB();
SqliteHelper.createRecordWarning();
console.disableYellowBox = true;
let UniqueID = DeviceInfo.getUniqueId();
export default class road extends Component {
    // latitude: 16.0324246,
    // longitude: 108.2184286,

    constructor(props) {
        super(props);
        this.state = {
            message: false,
            message1: false,
            name: "",
            time: "",
            uid: "",
            note: "",
            isVisible: false,
            latitude: 0,
            longitude: 0,
            Listwarning: [],
            warning: [],
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

        this.reload()
        this.getTime()
    }

    getTime() {
        var that = this;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        that.setState({
            time: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }

    reload() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getLocation()
        })
    }
    componentWillUnmount() {
        this.focusListener.remove()
    }
    componentWillMount = () => {
        this.setState({
            uid: UniqueID
        })
    }

    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            const item = temp.rows.item(i).name;
            listTemp.push(item);
        };
        this.setState({
            Listwarning: listTemp
        });
        this.getLocation()
    }

    getLocation = async () => {
        let listTempp = [];
        let temp = await SqliteHelper.getRecordWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            const item = temp.rows.item(i);
            listTempp.push(item);
        };
        this.setState({
            warning: listTempp
        });
    }

    New() {
        if (this.state.latitudeMaker == 0 || this.state.longitudeMaker == 0) {
            this.setState({
                message: true,
                name:'',
            })
        } else if (this.state.name == '') {
            this.setState({
                message: false,
                message1: true,
            })
        } else {
            this.getTime(),
            SqliteHelper.addRecordWaring(this.state.name, this.state.latitudeMaker, this.state.longitudeMaker, this.state.time, this.state.uid, this.state.note)
            this.setState({
                message: false,
                message1: false,
                name: '',
                note:'',
            })
            alert("thêm thành công")
        }

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


                    {this.state.warning.length > 0 && this.state.warning.map(marker => (
                        <Marker
                            coordinate={marker}
                            title={marker.name}
                            pinColor={'yellow'}
                            image={marker.icon}
                            description={marker.description}
                        />
                    ))}


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
                        <View style={styles.container}>
                            <Modal
                                animationType={'slide'}
                                transparent={false}
                                visible={this.state.isVisible}
                                onRequestClose={() => {
                                }}>
                                <View style={{ alignItems: "center", marginTop: 20 }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 20,
                                        marginLeft: 10,
                                        color: "#00F900"
                                    }}>
                                        THÊM VỊ TRÍ CẢNH BÁO MỚI
                                    </Text>
                                </View>
                                {this.state.message ?
                                    (<Text style={{ fontSize: 15, color: 'red', marginTop: 20, marginLeft: 10 }}>
                                        Mời chọn vị trí cần thêm cảnh báo
                                </Text>) : null}
                                <View style={{ marginTop: 10 }}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 17,
                                            marginLeft: 10
                                        }}>Chọn tên cảnh báo:</Text>
                                </View>
                                {this.state.message1 ?
                                    (<Text style={{ fontSize: 15, color: 'red', marginLeft: 10 }}>
                                        Mời chọn cảnh báo để tiếp tục
                                </Text>) : null}
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // marginTop: 
                                }}>
                                    <ModalDropdown
                                        textStyle={{
                                            fontSize: 14,
                                            color: 'black',
                                            paddingTop: 10,
                                            paddingLeft: 10,
                                            height: 40,
                                            backgroundColor: 'azure',
                                            width: 350,
                                            borderWidth: 1,
                                            borderColor: 'black',
                                        }}
                                        defaultValue="Chọn cảnh báo........"
                                        options={this.state.Listwarning}
                                        onSelect={(name) => this.setState({ name: (String(this.state.Listwarning[name])) })}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            marginLeft: 10
                                        }}>Thêm ghi chú:</Text>
                                </View>
                                <View style={{ alignItems: "center", marginTop: 15 }}>
                                    <TextInput value={this.state.note}
                                        onChangeText={note => this.setState({ note })}
                                        style={{
                                            height: 40,
                                            backgroundColor: 'azure',
                                            width: 350,
                                            borderWidth: 1,
                                            borderColor: 'black',
                                        }}
                                        placeholder="Nhập ghi chú tại đây !.........."
                                    />
                                </View>

                                <View style={{ marginTop: 40, marginLeft: 20, flexDirection: "row" }}>
                                    <View>
                                        <Button
                                            style={{ marginRight: 30 }}
                                            title='ADD'
                                            onPress={() => this.New()} />
                                    </View>
                                    <View style={{ width: 100, marginLeft: 20 }}>
                                        <Button
                                            title="Show list"
                                            onPress={() => {
                                                this.setState({ isVisible: !this.state.isVisible });
                                                this.props.navigation.navigate('LocationScreen')
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.modal}>
                                    <Button
                                        title="Return map"
                                        onPress={() => {
                                            this.setState({
                                                isVisible: !this.state.isVisible,
                                                message:false,
                                                message1:false,
                                            });
                                        }}
                                    />

                                </View>
                            </Modal>
                            <View style={{ flex: 1, width: 120, marginTop: 7, marginRight: 45 }}>
                                <Button
                                    title="WARNING INFOMATION"
                                    onPress={() => {
                                        this.setState({ isVisible: true });
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 100,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
});