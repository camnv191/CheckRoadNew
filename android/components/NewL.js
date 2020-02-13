import React, { Component } from 'react'
import { Text, View, Button, Alert, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import SqliteHelper from '../../sqlite.helper'
import validator from 'validator'
import ImagePicker from 'react-native-image-picker';


SqliteHelper.openDB();
SqliteHelper.createWarning();
export class NewL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            iconname: "",
            warning: [],
            filePath: {},

        }
    }

    chooseFile = () => {
        var options = {
            title: 'Choose image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                this.setState({
                    filePath: response,
                });
            }
        });
    };

    ClearInput() {
        this.clear.setNativeProps({ text: '' })
        this.clear2.setNativeProps({ text: '' })
    }
    New() {
        if (this.state.name == '') {
            alert("Bạn phải nhập tên cảnh báo")
        } else if (this.state.filePath == {}) {
            alert('Bạn phải chọn icon phù hợp')
        } else {
            SqliteHelper.addWaring(this.state.name,this.state.filePath.uri, this.state.iconname)
            this.setState({
                name: '',
                filePath: {},
                iconname: ''
            })
        }
    }

    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            const item = temp.rows.item(i);
            listTemp.push(item);
        };
        this.setState({
            warning: listTemp
        });
    }

    render() {
        return (
            <View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        marginLeft: 10,
                        color: 'red'
                    }}>
                        THÊM MỚI CẢNH BÁO
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginLeft: 10
                        }}>Nhập tên cảnh báo mới:</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TextInput value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        ref={component => this.clear = component}
                        style={{
                            height: 40,
                            backgroundColor: 'azure',
                            width: 350,
                            borderWidth: 1,
                            borderColor: 'black',
                            marginTop: 10,
                        }}
                        placeholder="Nhập tên cảnh báo tại đây !.........."
                    />
                </View>
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginLeft: 10
                        }}>Chọn icon cảnh báo:</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        source={{
                            uri: 'data:image/png;base64,'+ this.state.filePath.data,
                        }}
                        style={{ width: 50, height: 50, marginTop: 10, marginBottom: 10 }}
                    />
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                </View>
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginLeft: 10
                        }}>Nhập tên icon:</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TextInput
                        value={this.state.iconname}
                        onChangeText={iconname => this.setState({ iconname })}
                        ref={component => this.clear2 = component}
                        style={{
                            height: 40,
                            backgroundColor: 'azure',
                            width: 350,
                            borderWidth: 1,
                            borderColor: 'black',
                            marginTop: 10,
                        }}
                        placeholder="Nhập tên icon cảnh báo tại đây !.........."
                    />
                </View>
                <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "flex-start" }}>
                    <View style={{ width: 70, marginLeft: 16 }}>
                        <Button title='Add' onPress={() => this.New()} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Button title='Show list' onPress={() => this.props.navigation.navigate('WarningScreen')} />
                    </View>
                </View>
            </View >
        )
    }
}

export default NewL
