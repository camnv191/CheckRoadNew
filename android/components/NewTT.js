import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, FlatList, Text, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import SqliteHelper from '../../sqlite.helper';
import { TextInput } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import validator from 'validator';
import road from "./road";

SqliteHelper.openDB();
SqliteHelper.createRecordWarning();
class NewTT extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
    }
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

  render() {
    return (
      <View>
        <View style={{ marginTop:5 ,alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>RECORD WARNING</Text>
        <Text>{this.state.latitude}</Text>
        </View>
      </View>
    );
  }
}

export default NewTT