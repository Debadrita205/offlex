/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import route from './src/route';
 import { name as appName } from './app.json';
 import i18next from './src/Language/index';
 console.disableYellowBox = true
 AppRegistry.registerComponent(appName, () => route);
