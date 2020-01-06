/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Home from './source/Home';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Home);
