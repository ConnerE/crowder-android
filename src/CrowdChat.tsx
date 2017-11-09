import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    BackHandler,
    StatusBar,
    View,
    Dimensions,
    TextInput,
} from "react-native";

import * as firebase from "firebase";
import { GiftedChat } from 'react-native-gifted-chat';
const rootRef = firebase.database().ref();
const chatChanelRef = rootRef.child('chat_chanel');
import {Icon} from 'react-native-elements';


interface Props {
    navigation: any;
}

interface State {
    messages: any[];
}


class CrowdChat extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.props.navigation.setParams({title: this.props.navigation.state.params.crowdName});
        this.chatRef = chatChanelRef.child(this.props.navigation.state.params.key);
    }

    chatRef: any;

    componentDidMount() {
        this.getChat();
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
        };
    };


    getChat = () => {
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
                    messages: GiftedChat.append(previousState.messages, newMessage),
                }));

            }
        )
    };

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
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={false}/>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.props.navigation.state.params.UUID,
                    }}
                />
            </View>
        );
    }
}

export default CrowdChat;
