import * as React from 'react';
import { AppRegistry } from 'react-native';

import { StackNavigator} from 'react-navigation';
import LoginScreen from './LoginPage';
import Main from './MainPage'
import NewUser from './NewUser'


const Navigator = StackNavigator({
    Home: {screen: LoginScreen},
    Main: {screen: Main},
    NewUser: {screen: NewUser},

}, {
    initialRouteName: 'Home',
});



AppRegistry.registerComponent('crowder2', () => Navigator);