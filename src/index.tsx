import * as React from "react";
import { AppRegistry } from "react-native";

import { StackNavigator} from "react-navigation";
import LoginScreen from "./LoginPage";
import Main from "./MainPage";
import NewUser from "./NewUser";
import NewGroup from "./NewGroup";
import CrowdChat from "./CrowdChat";
import UserInfo from './UserInfo'
import PicturePicking from './PicturePicking'

const Navigator = StackNavigator({
    Home: {screen: LoginScreen},
    Main: {screen: Main},
    NewUser: {screen: NewUser},
    NewGroup: {screen: NewGroup},
    CrowdChat: {screen: CrowdChat},
    UserInfo: {screen: UserInfo},
    PicturePicking: {screen: PicturePicking}
}, {
    initialRouteName: "Home",
});

AppRegistry.registerComponent("crowder2", () => Navigator);
