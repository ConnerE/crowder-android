import * as React from "react";
import { AppRegistry } from "react-native";

import { StackNavigator} from "react-navigation";
import CrowdChat from "./CrowdChat";
import LoginScreen from "./LoginPage";
import Main from "./MainPage";
import NewGroup from "./NewGroup";
import NewUser from "./NewUser";

const Navigator = StackNavigator({
    CrowdChat: {screen: CrowdChat},
    Home: {screen: LoginScreen},
    Main: {screen: Main},
    NewGroup: {screen: NewGroup},
    NewUser: {screen: NewUser},

}, {
    initialRouteName: "Home",
});

AppRegistry.registerComponent("crowder2", () => Navigator);
