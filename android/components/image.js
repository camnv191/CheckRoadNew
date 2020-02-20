import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          {/* <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          /> */}
          {/* <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text> */}
          <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  {/* <Modal
                                    animationType={'slide'}
                                    transparent={false}
                                    visible={this.state.isVisibles}
                                    onRequestClose={() => {
                                    }}>                                    
                                        {this.state.cbwarning.map((val) => {
                                            { tempCheckValues[val.name] = true }
                                            return (
                                                <View key={val.name} style={{ flexDirection: 'column', marginTop: 10, height:20 }}>
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

                                    <View style={styles.modal}>
                                        <Button
                                            title="Return map"
                                            onPress={() => {
                                                this.setState({
                                                    isVisibles: !this.state.isVisibles,
                                                });
                                            }}
                                        />
                                    </View>
                                </Modal>
                                <View>
                                    <Button
                                        title="CUSTOM WARNING"
                                        onPress={() => {
                                            this.setState({ isVisibles: true });
                                        }}
                                    />
                                </View>
                            </View>
                        </View> */}