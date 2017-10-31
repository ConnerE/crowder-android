"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const LoginPage_1 = require("./LoginPage");
const MainPage_1 = require("./MainPage");
const NewUser_1 = require("./NewUser");
const NewGroup_1 = require("./NewGroup");
const CrowdChat_1 = require("./CrowdChat");
const Navigator = react_navigation_1.StackNavigator({
    Home: { screen: LoginPage_1.default },
    Main: { screen: MainPage_1.default },
    NewUser: { screen: NewUser_1.default },
    NewGroup: { screen: NewGroup_1.default },
    CrowdChat: { screen: CrowdChat_1.default }
}, {
    initialRouteName: 'Home',
});
react_native_1.AppRegistry.registerComponent('crowder2', () => Navigator);
//# sourceMappingURL=index.js.map