"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const firebase = require("firebase");
const react_native_gifted_chat_1 = require("react-native-gifted-chat");
const rootRef = firebase.database().ref();
const chatChanelRef = rootRef.child('chat_chanel');
class CrowdChat extends React.Component {
    constructor(props) {
        super(props);
        this.getChat = () => {
            this.chatRef.limitToLast(20).on('child_added', (snapshot) => {
                let returnObj = snapshot.val();
                // console.log(returnObj);
                let newMessage = {
                    _id: returnObj._id,
                    text: returnObj.text,
                    createdAt: new Date(returnObj.createdAt),
                    user: returnObj.user
                };
                this.setState((previousState) => ({
                    messages: react_native_gifted_chat_1.GiftedChat.append(previousState.messages, newMessage),
                }));
            });
        };
        this.state = {
            messages: [],
        };
        this.props.navigation.setParams({ title: this.props.navigation.state.params.crowdName });
        this.chatRef = chatChanelRef.child(this.props.navigation.state.params.key);
    }
    componentDidMount() {
        this.getChat();
    }
    onSend(messages = []) {
        this.chatRef.push({
            _id: messages[0]._id,
            onscreenName: 'Philip',
            text: messages[0].text,
            createdAt: messages[0].createdAt.toString(),
            user: messages[0].user
        });
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={false}/>
                <react_native_gifted_chat_1.GiftedChat messages={this.state.messages} onSend={(messages) => this.onSend(messages)} user={{
            _id: this.props.navigation.state.params.UUID,
        }}/>
            </react_native_1.View>);
    }
}
CrowdChat.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.state.params.title,
    };
};
exports.default = CrowdChat;
//# sourceMappingURL=CrowdChat.js.map