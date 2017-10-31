import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    BackHandler,
    StatusBar,
    Dimensions,
    TextInput
} from 'react-native';

import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
const rootRef = firebase.database().ref();
const chatRef = rootRef.child('chat_hist');


interface Props {
    navigation: any;
}

interface State {
    messages: any[];
    messageCounter: number;
}


class CrowdChat extends React.Component<Props, State> {
    constructor(props) {
        super(props);
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

    listenToChat = () => {
        chatRef.on('value', (snapshot) => {
            console.log(snapshot);
            if (snapshot.val()) {
                let returnObj = snapshot.val();
                for (let key in returnObj) {
                    this.setState({messageCounter: this.state.messageCounter + 1});
                    console.log(returnObj);
                    let newMessage = {
                        _id: returnObj[key]._id,
                        text: returnObj[key].text,
                        createdAt: returnObj[key].createdAt,
                        user: returnObj[key].user
                    };
                    this.setState((previousState) => ({
                        messages: GiftedChat.append(previousState.messages, newMessage),
                    }));
                }
            }
        });
    };


    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
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
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        );
    }
}

export default CrowdChat;