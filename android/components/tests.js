import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import CheckBox from 'react-native-check-box'
import SqliteHelper from '../../sqlite.helper';


SqliteHelper.openDB();

export default class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: [],
      name: '',
      warning: [],
    }
  }
 
  UNSAFE_componentWillMount = async () => {
    let listTemp = [];
    let temp = await SqliteHelper.getWarningName();
    for (let i = 0; i < temp.rows.length; i++) {
      const item = temp.rows.item(i);
      listTemp.push(item);
    };
    this.setState({
      warning: listTemp
    }); console.log(listTemp)
  }

  render() {
    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ height: '80%' }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.warning}
            renderItem={({ item }) => (
              <ScrollView >
                <View>
                  <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => {
                      this.setState({
                        isChecked: !this.state.isChecked
                      })
                    }}
                    isChecked={this.state.isChecked}
                    leftText={'-' + ' ' + item.name}
                  />
                </View>
              </ScrollView>
            )}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{
            flexDirection: "row",
            width: 70, backgroundColor: '#74DF00', alignItems: "center", borderWidth: 1, borderColor: '#2A0A0A'
          }}
            onPress={() => this.props.navigation.navigate('MapScreen')}>
            <View>
              <Image style={{ width: 30, height: 25 }}
                source={require('./image/reply.png')}
              />
            </View>
            <View>
              <Text style={{ marginTop: 2, fontWeight: "bold" }}>MAP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
