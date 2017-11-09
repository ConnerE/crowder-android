/* This is the login page for choosing the probes
 * Algo: The system will check whether the user has a preferred probe, if yes, scan the devices around, and if that
 * probe exists, connect to the probe automatically. After 10 seconds, the user will be about to choose other available
 * probes around, and the preferred probed will be changed automatically
 *
 * TODO: Catch all the errors / Get rid of all the weird warnings
 * TODO: Add color to the buttons next to the English description
 * by: Philip Wang
 * on: June 15th, 2017
 */

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
    about_me: string;
    email: string;
    full_name: string;
    job_title: string;
    photo_url: string;
    school: string;
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");

class NewUser extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

    }

    // public componentDidMount() {

    // }

    public submit = () => {
        itemsRef.update({
            [this.props.navigation.state.params.UUID]: {
                aboutMe: this.state.about_me,
                email: this.state.email,
                fullName: this.state.full_name,
                jobTitle: this.state.job_title,
                school: this.state.school,
            },
        });

    }

    public render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
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
                    onChangeText={(JobTitle) => this.setState({JobTitle})}
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
