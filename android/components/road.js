import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, ScrollView, Image, TextInput, Button, Modal, StyleSheet, FlatList, Alert, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ModalDropdown from 'react-native-modal-dropdown';
import DeviceInfo from 'react-native-device-info';
import CheckBox from 'react-native-check-box'
import Map from './Map'

console.disableYellowBox = true;
let UniqueID = DeviceInfo.getUniqueId();
export default class road extends Component {

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
            isVisibles: false,
            isChecked: [],
            latitude: 0,
            longitude: 0,
            Listwarning: [],
            checkBoxChecked: [],
            cbwarning: [],
            warning: [],
            filtername: [],
            nameinput: "",
            latitudeMaker: 0,
            longitudeMaker: 0,
            region: {
                latitude: 0,
                latitudeDelta: 0.01,
                longitude: 0,
                longitudeDelta: 0.01,
            }
        }
        this.newLocation = this.newLocation.bind(this)
    }

    getWarningData() {
        fetch('http://192.168.56.1:3100/warning', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let temp = responseJson.map(t => {
                    return { name: t.name };
                });
                const names = responseJson.map(t => t.name);
                this.setState({
                    Listwarning: names,
                    cbwarning: temp,
                })
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    }

    getRecordData() {
        fetch('http://192.168.56.1:3100/recordwarning', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    warning: responseJson,
                })
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    }

    getNameWarningByName() {
        fetch(`http://192.168.56.1:3100/warning/${this.state.nameinput}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filtername: responseJson,
                })
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    }

    getLocationWarning(checkBoxChecked) {
        var http = `http://192.168.56.1:3100/locationWarning`;
        if (checkBoxChecked && checkBoxChecked.length > 0) {
            http += `?${checkBoxChecked.map(t => `name=${t}`).join("&")}`
        }
        fetch(http, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    warning: responseJson,
                })
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    }

    setDataToMap(checkBoxChecked) {
        var checkBoxChecked = this.state.checkBoxChecked;
        if (checkBoxChecked == '' || checkBoxChecked == null) {
            this.getRecordData()
        } else {
            this.getLocationWarning(checkBoxChecked)
        }
    }

    getMyLocation() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
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

    componentDidMount() {
        this.getMyLocation()
        this.getTime()
        this.getWarningData()
        this.setDataToMap()
    }

    getTime() {
        var that = this;
        var now = new Date();
        var date = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();
        var hours = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        that.setState({
            time: year + '-' + this.format(month) + '-' + this.format(date) + ' ' + this.format(hours) + ':' + this.format(min) + ':' + this.format(sec),
        });
    }

    format(number) {
        return number > 0 ? number : `0${number}`;
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
            uid: UniqueID
        })
    }

    postRecordData() {
        if (this.state.latitudeMaker == 0 || this.state.longitudeMaker == 0) {
            this.setState({
                message: true,
                name: '',
            })
        } else if (this.state.name == '') {
            this.setState({
                message: false,
                message1: true,
            })
        } else {
            this.getTime();
            var dataToSend = { name: this.state.name, latitude: this.state.latitudeMaker, longitude: this.state.longitudeMaker, time: this.state.time, uid: this.state.uid, note: this.state.note };
            var formBody = [];
            for (var key in dataToSend) {
                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(dataToSend[key]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('http://192.168.56.1:3100/recordwarning', {
                method: "POST",
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    alert('thêm thành công');
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                });
            this.setState({
                message: false,
                message1: false,
                name: '',
                note: '',
            })
            this.setDataToMap()
        }
    }

    newLocation(data) {
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

    onclicks = id => {
        const { checkBoxChecked } = this.state;
        const isInclude = checkBoxChecked.includes(id)
        if (!isInclude) {
            this.setState(state => ({
                checkBoxChecked: [...state.checkBoxChecked, ...[id]],
            }));
        } else {
            this.setState(state => ({
                checkBoxChecked: state.checkBoxChecked.filter(item => item !== id),
            }));
        }
    }

    render() {
        const navigation = this.props;
        return (
            <View style={styles.allBodyStyle}>
                <View style={styles.mapStyle}>
                    <Map
                        region={this.state.region}
                        newLocation={this.newLocation}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        latitudeMaker={this.state.latitudeMaker}
                        longitudeMaker={this.state.longitudeMaker}
                        warning={this.state.warning}
                    />
                </View>
                <View style={styles.bodyBottomStyle}>
                    <View style={styles.compass}>
                        <TouchableOpacity onPress={() => this.getMyLocation()}>
                            <Image source={require('./image/compass.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.butonStyle}>
                        <View style={{ flex: 1, width: 65, justifyContent: "center", marginLeft: 13, opacity: 0.9 }}>
                            <Button
                                color={'black'}
                                title='New Warning'
                                onPress={() => this.props.navigation.navigate('NewLScreen')} />
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 2 }}
                            onPress={Keyboard.dismiss}
                        >
                            <View style={{ flex: 2, alignItems: "center", marginLeft: -30 }}>
                                <View style={{ width: 90 }}>
                                    <Modal
                                        animationType={'slide'}
                                        transparent={false}
                                        visible={this.state.isVisibles}
                                        onRequestClose={() => {
                                        }}>
                                        <View style={{ backgroundColor: "gray", width: '100%', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ flexDirection: "row" }}
                                                onPress={() => this.setState({
                                                    isVisibles: !this.state.isVisibles,
                                                })} >
                                                <View>
                                                    <Image
                                                        style={{ width: 20, height: 20, marginLeft: 10 }}
                                                        source={require('./image/back.png')} /></View>
                                                <View style={{ marginLeft: 5 }}>
                                                    <Text>RETURN MAP</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ alignItems: "center", marginTop: 20 }}>
                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 20,
                                                marginLeft: 10,
                                                color: "#B40404"
                                            }}>
                                                CHỌN CẢNH BÁO MUỐN HIỂN THỊ:
                                    </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", height: 30 }}>
                                            <TextInput
                                                value={this.state.nameinput}
                                                onChangeText={nameinput => this.setState({ nameinput })}
                                                placeholder="Nhập tên cảnh báo muốn tìm tại đây !"
                                                borderWidth={0.5}
                                            />
                                            <View style={{ marginTop: -3, marginLeft: 5 }}>
                                                <Button
                                                    title='Tìm kiếm'
                                                    onPress={() => this.getNameWarningByName()}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: 300 }}>
                                            <ScrollView>
                                                {this.state.filtername.map((val) => {
                                                    return (
                                                        <View key={val.name} style={{ flexDirection: 'column', marginTop: 10, marginLeft: 50 }}>
                                                            <CheckBox
                                                                onClick={() => this.onclicks(val.name)}
                                                                isChecked={this.state.checkBoxChecked.includes(val.name)}
                                                                rightText={val.name}
                                                                checkedCheckBoxColor='red'
                                                                checkBoxColor='blue'
                                                            />
                                                        </View >
                                                    )
                                                })}
                                            </ScrollView>
                                        </View>
                                        <View style={styles.modal}>
                                            <TouchableOpacity style={{ width: 70 }}
                                                onPress={() => {
                                                    this.setDataToMap();
                                                    this.setState({
                                                        isVisibles: !this.state.isVisibles,
                                                    });
                                                }}>
                                                <View style={{ flexDirection: "row", borderWidth: 1, padding: 3, marginRight: -3, backgroundColor: 'pink' }}>
                                                    <View>
                                                        <Image
                                                            style={{ width: 20, height: 20 }}
                                                            source={require('./image/filter.png')}
                                                        />
                                                    </View>
                                                    <View style={{ justifyContent: "center" }}>
                                                        <Text>FILTER</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                    <View style={{ marginLeft: -20, opacity: 0.9 }}>
                                        <Button
                                            title="warning options"
                                            color={'black'}
                                            onPress={() => {
                                                this.setState({ isVisibles: true });
                                                this.getWarningData();
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            style={{ flex: 2 }}
                            onPress={Keyboard.dismiss}
                        >
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
                                        (<Text style={{ fontSize: 15, color: 'red', marginLeft: 10 }}>
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
                                        marginTop: 15
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
                                                onPress={() => this.postRecordData()} />
                                        </View>
                                    </View>

                                    <View style={styles.modal}>
                                        <View style={{ marginTop: -85, marginLeft: -100 }}>
                                            <Button
                                                title="Return map"
                                                onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        message: false,
                                                        message1: false,
                                                    });
                                                }}
                                            />
                                        </View>
                                    </View>
                                </Modal>

                                <View style={{ flex: 1, width: 120, marginRight: 90, opacity: 0.9 }}>
                                    <Button
                                        color={'black'}
                                        title="WARNING INFOMATION"
                                        onPress={() => {
                                            this.setState({ isVisible: true });
                                            this.getWarningData();
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    allBodyStyle: {
        flex: 1,
        flexDirection: "column"
    },

    mapStyle: { flex: 8 },

    bodyBottomStyle: {
        position: 'absolute',
        flexDirection: "column",
        flex: 1.5,
        bottom: 10,
        justifyContent: "flex-end"
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },

    compass: {
        flex: 1,
        marginLeft: 340,
        marginBottom: 5,
        width: 70
    },

    butonStyle: {
        flex: 2,
        flexDirection: "row"
    }
});