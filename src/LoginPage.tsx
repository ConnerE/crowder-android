import * as React from "react";
import {
    BackHandler,
    DeviceEventEmitter,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput

} from "react-native";

import { SocialIcon } from "react-native-elements";
import * as Swiper from "react-native-swiper";
const {width} = Dimensions.get("window");
import * as firebase from "firebase";
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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
    storageBucket: "gs://crowderweb.appspot.com",
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
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }

                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                // login with credential
                console.log(firebase);
                console.log(credential);
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                this.props.navigation.navigate("Main", {UUID: currentUser.uid});
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
        // this.props.navigation.navigate("PicturePicking")
        // this.props.navigation.navigate("Main", {UUID: 'q'});
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={{flex: 0.65}}>
                    <Swiper style={styles.wrapper} horizontal={true} autoplay={false}>
                        <View style={styles.slide}>
                            <ImageBackground
                                source={require("../asset/login_img/group1.jpg")}
                                style={styles.image}
                                >
                            <Text style={styles.text}>Welcome to Crowder</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require("../asset/login_img/group2.jpg")}
                                style={styles.image}
                            >
                                <Text style={styles.textBottom}>Explore around</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require("../asset/login_img/group3.jpg")}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Find stuff you're into</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require("../asset/login_img/group4.jpg")}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Meet a chill crowd</Text>
                            </ImageBackground>
                        </View>

                    </Swiper>
                </View>
                <View style={styles.lowerView}>
                    {/*<TextInput*/}
                        {/*placeholder={"Temp UUID"}*/}
                        {/*placeholderTextColor={"rgba(255,255,255,0.8)"}*/}
                        {/*onChangeText={(tempUUID) => this.setState({tempUUID})}*/}
                        {/*underlineColorAndroid="rgba(0,0,0,0)"*/}
                    {/*/>*/}
                    {/*<TouchableOpacity onPress={this.loginPressed}>*/}
                        {/*<Text>*/}
                        {/*PH*/}
                        {/*</Text>*/}
                    {/*</TouchableOpacity>*/}
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
        justifyContent: "space-between",
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
        fontSize: 40,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
    },

    textBottom: {
        color: "#fff",
        flex: -0.90,
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
