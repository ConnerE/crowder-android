
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
    Image,
    Alert
} from "react-native";

import { SocialIcon } from "react-native-elements";
import * as Swiper from "react-native-swiper";
import CameraRollPicker from 'react-native-camera-roll-picker';
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
    school: string;
    url: string;
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
let storageRef = firebase.storage().ref();

class NewUser extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            url: "",
            aboutMe: "",
            email: "",
            fullName: "",
            jobTitle: "",
            school: ""
        };
    }

    public returnUrl = (url) => {
        console.log(url);
        this.setState({url: url});
    };

    public submit = () => {
        itemsRef.update({
            [this.props.navigation.state.params.UUID]: {
                aboutMe: this.state.aboutMe,
                email: this.state.email,
                fullName: this.state.fullName,
                jobTitle: this.state.jobTitle,
                school: this.state.school,
            },
        });

        this.props.navigation.state.params.returnData(this.state.fullName);
        this.props.navigation.goBack(null);
    };

    public updatePicture = () => {
        Alert.alert(
            'Choosing sources',
            'Place choose below',
            [
                {text: 'Camera Roll', onPress: () => {this.props.navigation.navigate("PicturePicking", {UUID: this.props.navigation.state.params.UUID, returnUrl: this.returnUrl.bind(this)})}},
                {text: 'Take Picture', onPress: () => {this.props.navigation.navigate("Camera", {UUID: this.props.navigation.state.params.UUID, returnUrl: this.returnUrl.bind(this)})}},
                {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        );
    };


    public render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <TouchableOpacity onPress={this.updatePicture}>
                    <Text>
                        Update Picture
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.try}>
                    <Text>
                        Try Picture
                    </Text>
                </TouchableOpacity>

                {this.state.url !== '' && <Image
                    style={{width: 50, height: 50}}
                    source={{uri: this.state.url}}
                />
                }


                <TextInput
                    placeholder={"About Me"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(aboutMe) => this.setState({aboutMe})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />
                <TextInput
                    placeholder={"Email"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />
                <TextInput
                    placeholder={"Full Name"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(fullName) => this.setState({fullName})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />
                <TextInput
                    placeholder={"Job Title"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(jobTitle) => this.setState({jobTitle})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />
                <TextInput
                    placeholder={"School"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(school) => this.setState({school})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />

                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {

    },

    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },

    image: {
        flex: 1,
    },

    textView: {
        marginLeft: 40,
        marginRight: 40,
    },

});

export default NewUser;
