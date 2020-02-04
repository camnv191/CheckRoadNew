import React, { PureComponent } from 'react'
import { Text, View, Button, FlatList, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import SqliteHelper from '../../sqlite.helper';

SqliteHelper.openDB();



export class NewL extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            warning: [],
        }
    }

    New() {
        if(this.state.value != '') {
            for(let j = 0; j < this.state.warning.length; j++) {
                if (this.state.warning[j].value == this.state.value) {
                    Alert.alert(
                        'Thông báo: thêm thất bại',
                        'Dữ liệu đã có',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => this.props.navigation.navigate('MapScreen'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => this.props.navigation.navigate('NewLScreen')}
                        ],
                        { cancelable: false }, 
                    );
                    break;
                } else {
                    SqliteHelper.addWaringNew(this.state.value)
                    this.props.navigation.navigate('MapScreen')
                }
            }
        } else {
            Alert.alert(
                'Thông báo: thêm thất bại',
                'Vui lòng nhập tên cảnh báo',
                [
                    {
                        text: 'Cancel',
                        onPress: () => this.props.navigation.navigate('MapScreen'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
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
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginLeft: 10
                        }}>Nhập tên cảnh báo mới:</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TextInput value={this.state.value}
                        onChangeText={value => this.setState({ value })}
                        style={{
                            height: 40,
                            backgroundColor: 'azure',
                            width: 350,
                            borderWidth: 1,
                            borderColor: 'black',
                            marginTop: 10,
                        }}
                        placeholder="Nhập tên cảnh báo tại đây !.........."
                    />
                </View>
                <View style={{ width: 65, alignItems: "flex-end", marginTop: 5 }}>
                    <Button title='Add' onPress={() => this.New()} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Danh sách cảnh báo đã có:</Text>
                    </View>
                    <FlatList
                        keyExtractor={(item, index) => item.key}
                        data={this.state.warning}
                        renderItem={({ item }) => (
                            <View>
                                <Text>- {item.value}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

export default NewL
