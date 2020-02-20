import React, { Component } from 'react';
import { Platform, View, Text, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import SqliteHelper from '../../sqlite.helper';
// import CheckBox from 'react-native-check-box'
SqliteHelper.openDB();

var tempCheckValues = [];
export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: [],
            warning: []
        }
    }
    checkBoxChanged(name, value = false) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })
        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[name] = !value;
        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
        console.log(name + ' ' + value)
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

    ScreenToMap(){
        SqliteHelper.getByCheckbox();
        this.props.navigation.navigate('MapScreen')
    }

    render() {
        return (
            <View>
                <View>
                    {this.state.warning.map((val) => {
                        { tempCheckValues[val.name] = false }
                        return (
                            <View key={val.name} style={{ flexDirection: 'column', marginTop: 10 }}>
                                <ScrollView>
                                    <Text style={{ marginLeft: 50 }}>
                                        {val.name}
                                    </Text>
                                    <View>
                                        <CheckBox
                                            style={{ marginTop: -24 }}
                                            value={this.state.checkBoxChecked[val.name]}
                                            onValueChange={() => this.checkBoxChanged(val.name, this.state.checkBoxChecked[val.name])}
                                        />
                                    </View>
                                </ScrollView>
                            </View >
                        )
                    })}
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'black'
                    }}
                        onPress={() => this.ScreenToMap()} >
                        <Text style={{ fontSize: 20, color: 'white', borderWidth: 1, borderColor: 'green' }}>FILTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}