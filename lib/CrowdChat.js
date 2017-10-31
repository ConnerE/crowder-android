"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const firebase = require("firebase");
const react_native_gifted_chat_1 = require("react-native-gifted-chat");
const rootRef = firebase.database().ref();
const chatRef = rootRef.child('chat_hist');
class CrowdChat extends React.Component {
    constructor(props) {
        super(props);
        this.listenToChat = () => {
            chatRef.on('value', (snapshot) => {
                console.log(snapshot);
                if (snapshot.val()) {
                    let returnObj = snapshot.val();
                    for (let key in returnObj) {
                        this.setState({ messageCounter: this.state.messageCounter + 1 });
                        console.log(returnObj);
                        let newMessage = {
                            _id: returnObj[key]._id,
                            text: returnObj[key].text,
                            createdAt: returnObj[key].createdAt,
                            user: returnObj[key].user
                        };
                        this.setState((previousState) => ({
                            messages: react_native_gifted_chat_1.GiftedChat.append(previousState.messages, newMessage),
                        }));
                    }
                }
            });
        };
        this.state = {
            messages: [],
            messageCounter: 1
        };
        this.listenToChat();
    }
    componentWillMount() {
        this.setState({
            messages: [],
        });
    }
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: react_native_gifted_chat_1.GiftedChat.append(previousState.messages, messages),
        }));
        console.log(messages);
        chatRef.push({
            _id: messages[0]._id,
            onscreenName: 'Philip',
            text: messages[0].text,
            createdAt: messages[0].createdAt,
            user: messages[0].user
        });
    }
    render() {
        return (<react_native_gifted_chat_1.GiftedChat messages={this.state.messages} onSend={(messages) => this.onSend(messages)} user={{
            _id: 1,
        }}/>);
    }
}
exports.default = CrowdChat;
//# sourceMappingURL=CrowdChat.js.map