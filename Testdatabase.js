import React, { Component } from 'react'
import { Text, View, ToastAndroid, FlatList, List, ListItem } from 'react-native'
var SQLite = require('react-native-sqlite-storage')

var db = null;

export default class Testdatabase extends Component {

    okCallback = () => {
        alert('okCallback')
    }

    errorCallback = () => {
        alert('errorCallback')
    }


    constructor(props) {

        super(props)
        db = SQLite.openDatabase({ name: 'text', createFromLocation: '~www/warning.db' }, this.okCallback, this.errorCallback);

        this.state = {
            Listwarning: [],
        };
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM warninginfo', [], (tx, results) => {
                // var len = results.rows.length;
                // if (len > 0) {
                //     var row = results.rows.item(0);
                //     this.setState({ name: row.name });
                // }
                var row = [];
                for(let i = 0 ; i<results.rows.length; ++i){
                    row.push(results.rows.item(i))
                }
                this.setState({
                    Listwarning:row,
                });
            });
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.Listwarning}
                    renderItem={({ item }) => (
                        <View>
                        <Text>ID: {item.id}</Text>
                        <Text>Name: {item.name}</Text>
                        <Text>Latitude: {item.latitude}</Text>
                        <Text>Longitude:{item.longitude}</Text>
                        </View>
                    )}
                />
            </View> 
        )
    }
}
