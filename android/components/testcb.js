import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SqliteHelper from '../../sqlite.helper';
SqliteHelper.openDB();
import CheckboxList from "rn-checkbox-list";

export default class testcb extends Component {
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
        console.log(this.state.warning)
    }

    render() {


        return (
            <View style={{flex:1, marginTop:10}}>
                <View style={{flex:0.5, alignItems:"center"}}>
                    <Text style={{fontSize:20,fontWeight:"bold",color:"green"}}>CHỌN CẢNH BÁO ĐỂ HIỂN THỊ:</Text>
                </View>
                <View style={{flex:10}}>
                    <CheckboxList
                        headerName="Chọn tất cả"
                        theme="red"
                        listItems={this.state.warning}
                        listItemStyle={{ borderBottomColor: '#eee', borderBottomWidth: 1}}
                    />
                </View>
            </View>
        )
    }
}
