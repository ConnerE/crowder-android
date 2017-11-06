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
    TextInput, ComponentInterface,
} from "react-native";

import * as firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
const rootRef = firebase.database().ref();
const chatChanelRef = rootRef.child("chat_chanel");
import {Icon} from "react-native-elements";

interface IProps {
    navigation: any;
}

interface IState {
    messages: any[];
}

class CrowdChat extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.props.navigation.setParams({title: this.props.navigation.state.params.crowdName});
        this.chatRef = chatChanelRef.child(this.props.navigation.state.params.key);
    }

    public chatRef: any;

    public componentDidMount() {
        this.getChat();
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
        };
    }

    getChat = () => {
        this.chatRef.limitToLast(20).on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                // console.log(returnObj);
                const newMessage = {
                    createdAt: new Date(returnObj.createdAt),
                    _id: returnObj._id,
                    text: returnObj.text,
                    user: returnObj.user,
                };

                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, newMessage),
                }));

            },
        );
    }

    public onSend(messages = []) {
        this.chatRef.push({
            createdAt: messages[0].createdAt.toString(),
            _id: messages[0]._id,
            onscreenName: "Philip",
            text: messages[0].text,
            user: messages[0].user,
        });
    }

    public render() {
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
