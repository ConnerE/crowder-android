import * as React from 'react';
import { AppRegistry } from 'react-native';

import { StackNavigator} from 'react-navigation';
import LoginScreen from './LoginPage';
import Main from './MainPage';
import NewUser from './NewUser';
import NewGroup from './NewGroup';
import CrowdChat from './CrowdChat'


const Navigator = StackNavigator({
    Home: {screen: LoginScreen},
    Main: {screen: Main},
    NewUser: {screen: NewUser},
    NewGroup: {screen: NewGroup},
    CrowdChat: {screen: CrowdChat}
}, {
    initialRouteName: 'Home',
});



AppRegistry.registerComponent('crowder2', () => Navigator);
