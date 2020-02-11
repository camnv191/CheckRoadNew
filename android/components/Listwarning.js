import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView,Button } from 'react-native'
import SqliteHelper from '../../sqlite.helper'

SqliteHelper.openDB();

export default class Listwarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: [],
        }
    }

    Delete() {
        SqliteHelper.deleteWarning()
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

                <View style={{ height: '90%', width: 200 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.warning}
                        renderItem={({ item }) => (
                            <ScrollView>
                                    <View>
                                        <Text>--------------{item.Id}--------------</Text>
                                        <Text>- {item.name}</Text>
                                        <Text>- {item.icon}</Text>
                                        <Text>- {item.iconname}</Text>
                                    </View>
                            </ScrollView>
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
