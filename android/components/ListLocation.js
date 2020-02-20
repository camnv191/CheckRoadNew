import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, ScrollView, View } from 'react-native'
import SqliteHelper from '../../sqlite.helper'

SqliteHelper.openDB();
export default class ListLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListLocation: [],
    }
  }

  UNSAFE_componentWillMount = async () => {
    let listTemp = [];
    let temp = await SqliteHelper.getRecordWarning();
    for (let i = 0; i < temp.rows.length; i++) {
      const item = temp.rows.item(i);
      listTemp.push(item);
    };
    this.setState({
      ListLocation: listTemp
    });
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Danh sách vị trí cảnh báo đã có:</Text>
        </View>

        <View style={{ height: '90%', width: 250 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.ListLocation}
            renderItem={({ item }) => (
              <ScrollView>
                <View style={{width:250}}>
                  <Text>-------------------{item.Id}------------------</Text>
                  <Text>-Tên cảnh báo: {item.name}</Text>
                  <Text>-Latitude: {item.latitude}</Text>
                  <Text>-Longitude: {item.longitude}</Text>
                  <Text>-Thời gian lưu: {item.time}</Text>
                  <Text>-UID: {item.uid}</Text>
                  <Text>-Ghi chú: {item.note}</Text>
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
