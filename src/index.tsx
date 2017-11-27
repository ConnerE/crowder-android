import * as React from "react";
import { AppRegistry } from "react-native";

import { StackNavigator} from "react-navigation";
import LoginScreen from "./LoginPage";
import Main from "./MainPage";
import NewUser from "./NewUser";
import NewGroup from "./NewGroup";
import CrowdChat from "./CrowdChat";
import UserInfo from './UserInfo';
import PicturePicking from './PicturePicking';
import CameraPage from './CameraPage';
import PictureConfirm from './PictureComfirm';
import EditInfo from './EditInfo';
import GroupInfo from './GroupInfo'

const Navigator = StackNavigator({
    Home: {screen: LoginScreen},
    Main: {screen: Main},
    NewUser: {screen: NewUser},
    NewGroup: {screen: NewGroup},
    CrowdChat: {screen: CrowdChat},
    UserInfo: {screen: UserInfo},
    PicturePicking: {screen: PicturePicking},
    Camera: {screen: CameraPage},
    PictureConfirm: {screen: PictureConfirm},
    EditInfo: {screen: EditInfo},
    GroupInfo: {screen: GroupInfo}
}, {
    initialRouteName: "Home",
});

AppRegistry.registerComponent("crowder2", () => Navigator);
