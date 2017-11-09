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
    ImageBackground,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touc
    ImageBackground,hableOpacity,
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
                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group1.jpg')}
                                style={styles.image}
                                >
                            <Text style={styles.text}>Welcome to Crowder</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group2.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Explore around you</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group3.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Find stuff you're into</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group4.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Meet a chill crowd</Text>
                            </ImageBackground>
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
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
    },

    wrapper: {

    },

    slide: {
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
    },

    image: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },

    lowerText: {
        color: "white",
    },

    lowerView : {
        alignItems: "center",
        backgroundColor: "#ef7c27",
        flex: 0.35,
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
    },

    textView: {
        marginLeft: 40,
        marginRight: 40,
    },

});

export default Login;
