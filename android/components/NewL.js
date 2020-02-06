import React, { Component } from 'react'
import { Text, View, Button, FlatList, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import SqliteHelper from '../../sqlite.helper'
import validator from 'validator'

SqliteHelper.openDB();



export class NewL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            warning: [],
        }
    }

    Delete() {
        if (this.state.value != "") {
            for (let i = 0; i < this.state.warning.length; i++) {
                let a = validator.trim(this.state.value.substring(0, 1).toUpperCase() + this.state.value.substring(1))
                if (validator.equals(this.state.warning[i].value, a)) {
                    return (SqliteHelper.deleteWarning(a),
                    this.ClearInput())
                }
            } Alert.alert(
                'không tìm thấy dữ liệu muốn xóa',
                'vui lòng nhập lại')
        }
    }

    componentWillUpdate() {
        this.UNSAFE_componentWillMount()
    }

    ClearInput() {
        this.clear.setNativeProps({ text: '' })
    }
    New() {
        if (this.state.value != "") {
            for (let j = 0; j < this.state.warning.length; j++) {
                if (validator.equals(this.state.warning[j].value, this.state.value)) {
                    return (Alert.alert(
                        'Thêm thất bại',
                        'Dữ liệu đã có',
                    ),
                        this.ClearInput());
                }
            }
            let a = validator.trim(this.state.value.substring(0, 1).toUpperCase() + this.state.value.substring(1))
            SqliteHelper.addWaringNew(a)
            this.ClearInput()
        } else {
            Alert.alert(
                'Thông báo: thêm thất bại',
                'Vui lòng nhập tên cảnh báo',
                [
                    {
                        text: 'Cancel',
                        onPress: () => this.props.navigation.navigate('MapScreen'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
    }


    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarningByName();
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
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginLeft: 10
                        }}>Nhập tên cảnh báo mới:</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TextInput value={this.state.value}
                        onChangeText={value => this.setState({ value })}
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
                <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "flex-start" }}>
                    <View style={{ width: 70, marginLeft: 16 }}>
                        <Button title='Add' onPress={() => this.New()} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Button title='Delete' onPress={() => this.Delete()} />
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Danh sách cảnh báo đã có:</Text>
                    </View>
                    <View style={{ height: 350, width: 200 }}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.warning}
                            renderItem={({ item }) => (
                                <ScrollView>
                                    <View>
                                        <Text>- {item.value}</Text>
                                    </View>
                                </ScrollView>
                            )}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default NewL
