// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
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

import { SocialIcon } from "react-native-elements";
import * as Swiper from "react-native-swiper";
const {width} = Dimensions.get("window");
import * as firebase from "firebase";


interface IProps {
    navigation: any;
}

interface IState {
    aboutMe: string;
    email: string;
    fullName: string;
    jobTitle: string;
    photo_url: string;
    school: string;
    ready: boolean
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");

class UserInfo extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            aboutMe: "",
            email: "",
            fullName: "",
            jobTitle: "",
            school: "",
            ready: false,
            photo_url: ""
        };


        this.getUserInfo();
    }

    public getUserInfo = () => {
        itemsRef.child(this.props.navigation.state.params._id).once("value", (snapshot) => {
            if (snapshot.val() !== null) {
                this.setState({
                    aboutMe: snapshot.val().aboutMe,
                    email: snapshot.val().email,
                    fullName: snapshot.val().fullName,
                    jobTitle: snapshot.val().jobTitle,
                    school: snapshot.val().school,
                    ready: true
                });
            } else {
                alert('You have just found a bug')
            }
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                {!this.state.ready && (<Text>Loading....</Text>)}
                {this.state.ready && (                <View>
                    <Text>{this.state.fullName}</Text>
                    <Text>{this.state.aboutMe}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.school}</Text>
                    <Text>{this.state.jobTitle}</Text>
                </View>)}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    slide: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
    },
    submitView: {
        bottom: 0,
        position: "absolute",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    wrapper: {
    },
});

export default UserInfo;
