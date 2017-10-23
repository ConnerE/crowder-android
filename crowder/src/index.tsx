import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Login from './LoginPage'
import Main from './MainPage'

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Main', () => Main);


Navigation.startSingleScreenApp({
    screen: {
        screen: 'Login', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});

// AppRegistry.registerComponent('crowder', () => Login);