"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const firebase = require("firebase");
const react_native_gifted_chat_1 = require("react-native-gifted-chat");
const rootRef = firebase.database().ref();
const chatChanelRef = rootRef.child("chat_chanel");
const react_native_elements_1 = require("react-native-elements");
class CrowdChat extends React.Component {
    constructor(props) {
        super(props);
        this.getChat = () => {
            this.chatRef.limitToLast(20).on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                // console.log(returnObj);
                const newMessage = {
                    _id: returnObj._id,
                    createdAt: new Date(returnObj.createdAt),
                    text: returnObj.text,
                    user: returnObj.user,
                };
                this.setState((previousState) => ({
                    messages: react_native_gifted_chat_1.GiftedChat.append(previousState.messages, newMessage),
                }));
            });
        };
        this.gotoInfo = () => {
            this.props.navigation.navigate("GroupInfo", { groupID: this.props.navigation.state.params.key });
        };
        this.avatarClicked = (user) => {
            this.props.navigation.navigate("UserInfo", { _id: user._id });
        };
        this.state = {
            messages: [],
        };
        this.chatRef = chatChanelRef.child(this.props.navigation.state.params.key);
    }
    componentDidMount() {
        this.getChat();
        this.props.navigation.setParams({ gotoInfo: this.gotoInfo.bind(this), title: this.props.navigation.state.params.crowdName });
    }
    onSend(messages = []) {
        this.chatRef.push({
            _id: messages[0]._id,
            createdAt: messages[0].createdAt.toString(),
            onscreenName: "Philip",
            text: messages[0].text,
            user: messages[0].user,
        });
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={false}/>
                <react_native_gifted_chat_1.GiftedChat messages={this.state.messages} onSend={(messages) => this.onSend(messages)} user={{
            _id: this.props.navigation.state.params.UUID,
            name: this.props.navigation.state.params.fullName,
        }} isAnimated={true} showUserAvatar={true} renderAvatarOnTop={true} onPressAvatar={(user) => this.avatarClicked(user)}/>
            </react_native_1.View>);
    }
}
CrowdChat.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.state.params.title,
        headerTintColor: "#FFFFFF",
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: "#003EFF",
            marginTop: (react_native_1.Platform.OS === 'ios') ? -20 : 0,
        },
        headerRight: <react_native_elements_1.Icon name="info" color="#FFFFFF" size={35} onPress={() => {
            if (navigation.state.params.gotoInfo !== undefined) {
                navigation.state.params.gotoInfo();
            }
        }}/>,
    };
};
exports.default = CrowdChat;
//# sourceMappingURL=CrowdChat.js.map