import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, FlatList, Text, Button } from 'react-native';
import SqliteHelper from '../../sqlite.helper';
import { TextInput } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

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
    }
  }

  NewWarning() {
    SqliteHelper.addWaring(this.state.value, this.state.range, this.state.latitude, this.state.longitude)
    this.props.navigation.navigate('MapScreen')
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
  }
  render() {
    return (
      <View>
        <View style={{ width: 350, marginLeft: 15, marginTop: 10, borderColor: 'black', borderWidth: 1 }}>
          <Dropdown
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
            label='Chọn cảnh báo của bạn'
            data={this.state.warning}
          />
        </View>
        <View style={{ borderColor: 'black', marginTop: 30, borderWidth: 1, width: 350, marginLeft: 15 }}>
          <TextInput
            placeholder='nhập khoảng cách....'
            value={this.state.range}
            onChangeText={range => this.setState({ range })}
          />
        </View>
        <View style={{ width: 65, alignItems: "flex-end", marginTop: 5 }}>
          <Button title='Add' onPress={() => this.NewWarning()} />

        </View>
      </View>
    );
  }
}

export default NewTT

