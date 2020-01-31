import React, { Component } from 'react'
import { Text, View, TextInput, dropDow } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';

export class NewTT extends Component {
    render() {
        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];


        // let data2 = [{
        //     value: '50',
        // }, {
        //     value: '100',
        // }, {
        //     value: '500',
        // }];

        return (

            <View style={{ flex: 1 }}>
                {/* <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, marginLeft: 28 }}>Chọn loại cảnh báo:</Text>
                </View> */}
                {/* <View style={{ alignItems: "center", flex: 1 }}>
                    <TextInput style={{ borderWidth: 1, borderRadius: 2, borderColor: 'black', width: 330 }}></TextInput>
                </View> */}
                <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                    <Dropdown
                        baseColor='black'
                        label='Chọn Loại cảnh báo'
                        data={data}
                    />
                </View>
                {/* <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                    <Dropdown
                        baseColor='black'
                        label='Chọn khoảng cách của bạn'
                        data={data2}
                    />
                </View> */}
            </View>
        )
    }
}

export default NewTT
