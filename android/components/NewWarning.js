import React, { Component } from 'react'
import { Text, View, Button, Alert, Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-picker';

export class NewWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            warning: [],
            filePath: '',
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
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    };

    validateForm() {
        this.getDataUsingGet();
        for (let i = 0; i < this.state.warning.length; i++) {
            if (this.state.warning[i] == this.state.name) {
                return alert('Trùng dữ liệu')
            }
        }
        if (this.state.name == '') {
            alert("Bạn phải nhập tên cảnh báo")
        } else if (this.state.filePath == '') {
            alert('Bạn phải chọn icon phù hợp')
        } else {
            this.PostDataWarning()
        }
        this.setState({
            name: '',
            filePath: '',
        })
    }

    getDataUsingGet() {
        fetch('http://192.168.56.1:3100/warning', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const name = responseJson.map(t => t.name);
                this.setState({
                    warning: name,
                })
            })
            .catch((error) => {
                alert(JSON.stringify(error));
                console.error(error);
            });
    }

    async PostDataWarning() {
        var dataToSend = { name: this.state.name, icon: this.state.filePath.uri };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('http://192.168.56.1:3100/warning', {
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
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.textStyleTop}> THÊM MỚI CẢNH BÁO </Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>Nhập tên cảnh báo mới:</Text>
                </View>
                <View style={styles.container}>
                    <TextInput value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        ref={component => this.clear = component}
                        style={styles.textInputStyle}
                        placeholder="Nhập tên cảnh báo tại đây !.........."
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Chọn icon cảnh báo:</Text>
                </View>
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.filePath.uri }}
                        style={styles.imageStyle}
                    />
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                </View>
                <View style={styles.buttonStyle}>
                    <Button title='Add' onPress={() => this.validateForm()} />
                </View>
            </View >
        )
    }
}
export default NewWarning
const styles = StyleSheet.create({
    textStyleTop: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
        color: 'red'
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 17,
        marginLeft: 18,
        marginTop: 10
    },
    container: {
        textAlign: "center",
        alignItems: "center"
    },
    textInputStyle: {
        height: 40,
        backgroundColor: 'azure',
        width: 350,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
    },
    buttonStyle: {
        marginTop: 5,
        justifyContent: "flex-start",
        width: 70,
        marginLeft: 16
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10
    }
})