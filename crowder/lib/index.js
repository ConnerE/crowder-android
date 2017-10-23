"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_navigation_1 = require("react-native-navigation");
const LoginPage_1 = require("./LoginPage");
const MainPage_1 = require("./MainPage");
react_native_navigation_1.Navigation.registerComponent('Login', () => LoginPage_1.default);
react_native_navigation_1.Navigation.registerComponent('Main', () => MainPage_1.default);
react_native_navigation_1.Navigation.startSingleScreenApp({
    screen: {
        screen: 'Login',
        title: 'Welcome',
        navigatorStyle: {},
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    passProps: {},
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
// AppRegistry.registerComponent('crowder', () => Login); 
//# sourceMappingURL=index.js.map