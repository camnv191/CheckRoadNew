/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App'
import testlogin from './android/components/testlogin';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => testlogin);
