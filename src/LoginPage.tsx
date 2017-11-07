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
// import { AccessToken, LoginManager } from 'react-native-fbsdk';

interface IProps {
    navigation: any;
}

interface IState {
    tempUUID: string;
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6RniCY4_KIkjHTUI6QNguw2TgKJZNKVA",
    authDomain: "crowderweb.firebaseapp.com",
    databaseURL: "https://crowderweb.firebaseio.com",
    messagingSenderId: "744758366305",
    projectId: "crowderweb",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("items");

class Login extends React.Component<IProps, IState> {

    public static navigationOptions = {
        header: null,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            tempUUID: "",
        };
    }

    public loginPressed = () => {
        this.props.navigation.navigate("Main", {UUID: this.state.tempUUID});
    }

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={{flex: 0.65}}>
                    <Swiper style={styles.wrapper} horizontal={true} autoplay>
                        <View style={styles.slide1}>
                            <Text style={styles.text}>Welcome to Crownder</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>I don't know what to write</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>Conner is suppose to do this part</Text>
                        </View>
                        <View style={styles.slide4}>
                            <Text style={styles.text}>And yeaaa</Text>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.lowerView}>
                    <TextInput
                        placeholder={"Temp UUID"}
                        placeholderTextColor={"rgba(255,255,255,0.8)"}
                        onChangeText={(tempUUID) => this.setState({tempUUID})}
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />
                    <SocialIcon
                        title="Sign In With Facebook"
                        button
                        type="facebook"
                        style={{width: width - 40, marginBottom: 40}}
                        onPress={this.loginPressed}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.lowerText}>We use facebook to identify whether you are a zombie.</Text>
                        <Text style={styles.lowerText}>In our experience, zombies don't do well in crowds.</Text>
                    </View>
                </View>
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

    slide: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
    },

    slide1: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    slide2: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    slide3: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },
    slide4: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    image: {
        flex: 1,
    },

    lowerText: {
        color: "white",
    },

    lowerView : {
        alignItems: "center",
        backgroundColor: "#FFCD00",
        flex: 0.35,
        justifyContent: "center",
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

});

export default Login;
