"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const LoginPage_1 = require("./LoginPage");
const MainPage_1 = require("./MainPage");
const NewUser_1 = require("./NewUser");
const NewGroup_1 = require("./NewGroup");
const CrowdChat_1 = require("./CrowdChat");
const UserInfo_1 = require("./UserInfo");
const PicturePicking_1 = require("./PicturePicking");
const CameraPage_1 = require("./CameraPage");
const PictureComfirm_1 = require("./PictureComfirm");
const EditInfo_1 = require("./EditInfo");
const Navigator = react_navigation_1.StackNavigator({
    Home: { screen: LoginPage_1.default },
    Main: { screen: MainPage_1.default },
    NewUser: { screen: NewUser_1.default },
    NewGroup: { screen: NewGroup_1.default },
    CrowdChat: { screen: CrowdChat_1.default },
    UserInfo: { screen: UserInfo_1.default },
    PicturePicking: { screen: PicturePicking_1.default },
    Camera: { screen: CameraPage_1.default },
    PictureConfirm: { screen: PictureComfirm_1.default },
    EditInfo: { screen: EditInfo_1.default }
}, {
    initialRouteName: "Home",
});
react_native_1.AppRegistry.registerComponent("crowder2", () => Navigator);
//# sourceMappingURL=index.js.map