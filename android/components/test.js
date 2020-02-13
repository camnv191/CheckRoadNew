import React, { Component } from 'react';
import {
 AppRegistry, Image
} from 'react-native';
 
export default class test extends Component {
 render() {
 
 let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};
 
 return (
 <Image source={Image_Http_URL} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
 );
 }
}
 
AppRegistry.registerComponent('test', () => test);