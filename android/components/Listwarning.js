import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, Button, Image, TouchableOpacity } from 'react-native'
import SqliteHelper from '../../sqlite.helper'

SqliteHelper.openDB();

export default class Listwarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: [],
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
            <View style={{ alignItems: "center" }}>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Danh sách cảnh báo đã có:</Text>
                </View>

                <View style={{ height: '88%', width: 230 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.warning}
                        renderItem={({ item }) => (
                            <ScrollView>
                                <View>
                                    <View>
                                        <Text>--------------{item.Id}--------------</Text>
                                        <Text>-Tên cảnh báo: {item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <View>
                                            <Text>-Icon:</Text>
                                        </View>
                                        <View>
                                            <Image
                                                source={{
                                                    uri: item.icon,
                                                }}
                                                style={{ width: 30, height: 30, marginTop: -5, marginLeft: 5 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        )}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        backgroundColor: '#74DF00',
                        marginTop: 5,
                        padding: 2,
                        borderWidth: 1,
                        borderColor: '#2A0A0A'
                    }}
                        onPress={() => this.props.navigation.navigate('NewLScreen')}>
                        <View>
                            <Image style={{ width: 30, height: 25 }}
                                source={require('./image/reply.png')}
                            />
                        </View>
                        <View>
                            <Text style={{ marginTop: 2, fontWeight: "bold" }}>New Warning</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
