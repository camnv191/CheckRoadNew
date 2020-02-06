import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, FlatList, Text, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import SqliteHelper from '../../sqlite.helper';
import { TextInput } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import validator from 'validator';

SqliteHelper.openDB();
class NewTT extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "",
      range: "",
      latitude: 0,
      longitude: 0,
      warning: [],
      warninginfo: [],
    }
  }
  getWarning = async () => {
    let listTempp = [];
    let tempp = await SqliteHelper.getWarning();
    for (let i = 0; i < tempp.rows.length; i++) {
      const item = tempp.rows.item(i);
      listTempp.push(item);
    };
    this.setState({
      warninginfo: listTempp
    });
  }

  CheckWarning() {
    for (let i = 0; i < this.state.warninginfo.length; i++) {
      if (this.state.warninginfo[i].value == this.state.value && this.state.warninginfo[i].latitude == this.state.latitude) {
        return (Alert.alert(
          'Không hợp lệ',
          'Trùng dữ liệu')),
          this.clearInput()
      }
    }
    if (this.state.value == null || this.state.value == '') {
      Alert.alert(
        'Không hợp lệ',
        'Mời chọn cảnh báo'
      )
    } else if (!validator.isInt(this.state.range, { min: 1, max: 5 })) {
      Alert.alert(
        'Thông báo: thêm thất bại',
        'Khoảng cách bắt buộc nằm trong khoảng 1 đến 5',
      ); this.clearInput()
    } else {
      SqliteHelper.addWaring(this.state.value, this.state.range, this.state.latitude, this.state.longitude)
      this.clearInput()
    }
  }

  UNSAFE_componentWillUpdate() {
    this.getWarning()
  }

  clearInput(){
    this.clear.setNativeProps({ text: '' })
  }


  componentDidMount() {
    Geolocation.getCurrentPosition(position => {

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
  }


  UNSAFE_componentWillMount = async () => {
    let listTemp = [];
    const { keyword } = this.state;
    let temp = await SqliteHelper.getWarningByName(keyword);
    for (let i = 0; i < temp.rows.length; i++) {
      const item = temp.rows.item(i);
      listTemp.push(item);
    };
    this.setState({
      warning: listTemp
    });
    this.getWarning()
  }
  render() {
    return (
      <View>
        <View style={styles.listwarning}>
          <Dropdown
            ref={component => this.cleardr= component}
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
            label='Chọn cảnh báo của bạn'
            data={this.state.warning}
          />
        </View>
        <View style={styles.textinput}>
          <TextInput
            ref={component => this.clear = component}
            placeholder='nhập khoảng cách ...(m)'
            value={this.state.range}
            onChangeText={range => this.setState({ range })}
          />
        </View>
        <View style={{ width: 65, alignItems: "flex-end", marginTop: 5 }}>
          <Button title='Add' onPress={() => this.CheckWarning()} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Danh sách đã có</Text>
        </View>
        <View style={{ height: 250, alignItems: "center" }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.warninginfo}
            renderItem={({ item }) => (
              <ScrollView>
                <View>
                  <Text>--------------{item.id}--------------</Text>
                  <Text>- Tên cảnh báo: {item.value}</Text>
                  <Text>- Khoảng cách: {item.range}m</Text>
                  <Text>- Vĩ độ: {item.latitude}</Text>
                  <Text>- Kinh độ: {item.longitude}</Text>
                </View>
              </ScrollView>
            )}
          />
        </View>
      </View>
    );
  }
}

export default NewTT

const styles = StyleSheet.create({
  listwarning: { width: 350, marginLeft: 15, marginTop: 10, borderColor: 'black', borderWidth: 1 },
  textinput: { borderColor: 'black', marginTop: 30, borderWidth: 1, width: 350, marginLeft: 15 }
})