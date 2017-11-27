import * as React from "react";
import {
    BackHandler,
    DeviceEventEmitter,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
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
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerTintColor: "#FFFFFF",
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
            headerRight: <Icon name="info" color="#FFFFFF" size={35}
                               onPress={() => {
                                   if (navigation.state.params.gotoInfo !== undefined) {
                                       navigation.state.params.gotoInfo();
                                   }
                               }}/>,
        };
    };
    public chatRef: any;
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.chatRef = chatChanelRef.child(this.props.navigation.state.params.key);
    }

    public getChat = () => {
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
                    messages: GiftedChat.append(previousState.messages, newMessage),
                }));

            },
        );
    };

    public gotoInfo = () => {
        this.props.navigation.navigate("GroupInfo", {groupID: this.props.navigation.state.params.key});
    };

    private componentDidMount() {
        this.getChat();
        this.props.navigation.setParams({gotoInfo: this.gotoInfo.bind(this), title: this.props.navigation.state.params.crowdName});
    }

    private onSend(messages = []) {
        this.chatRef.push({
            _id: messages[0]._id,
            createdAt: messages[0].createdAt.toString(),
            onscreenName: "Philip",
            text: messages[0].text,
            user: messages[0].user,
        });
    }

    private avatarClicked = (user) => {
        this.props.navigation.navigate("UserInfo", {_id: user._id});
    };

    private render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.props.navigation.state.params.UUID,
                        name: this.props.navigation.state.params.fullName,
                    }}
                    isAnimated={true}
                    showUserAvatar={true}
                    renderAvatarOnTop={true}
                    onPressAvatar={(user) => this.avatarClicked(user)}
                />
            </View>
        );
    }
}

export default CrowdChat;
