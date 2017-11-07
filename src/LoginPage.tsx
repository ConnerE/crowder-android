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

import * as React from 'react';
import {
<<<<<<< Updated upstream
    StyleSheet,
    Text,
=======
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
>>>>>>> Stashed changes
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    BackHandler,
    StatusBar,
    Dimensions,
    TextInput
} from 'react-native';

import * as Swiper from 'react-native-swiper';
import { SocialIcon } from 'react-native-elements'
const {width} = Dimensions.get('window');
import * as firebase from 'firebase';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';


interface Props {
    navigation: any;
}

interface State {
    tempUUID: string
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6RniCY4_KIkjHTUI6QNguw2TgKJZNKVA",
    authDomain: "crowderweb.firebaseapp.com",
    databaseURL: "https://crowderweb.firebaseio.com",
    projectId: "crowderweb",
    storageBucket: "",
    messagingSenderId: "744758366305"
};
firebase.initializeApp(firebaseConfig);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');

class Login extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            tempUUID: ''
        };
    }

    static navigationOptions = {
        header: null
    };

    loginPressed = () => {
        this.props.navigation.navigate('Main', {UUID: this.state.tempUUID});
    };

    render() {
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
                                source={require('./img/group1.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Explore around you</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group1.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Find stuff you're into</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group1.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Meet a chill crowd</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.slide}>
                            <ImageBackground
                                source={require('./img/group1.jpg')}
                                style={styles.image}
                            >
                                <Text style={styles.text}>Welcome to Crownder</Text>
                            </ImageBackground>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.lowerView}>
                    <TextInput
                        placeholder={"Temp UUID"}
                        placeholderTextColor={'rgba(255,255,255,0.8)'}
                        onChangeText={(tempUUID) => this.setState({tempUUID})}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        style={{width: width - 40, marginBottom: 40}}
                        onPress={this.loginPressed}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.lowerText}>We use facebook to identify whether you are a human or a zombie.</Text>
                        <Text style={styles.lowerText}>In our experience, zombies tend to eat human brains, and well we don’t want that in our crowds.</Text>
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
<<<<<<< Updated upstream
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
=======
        alignItems: "stretch",
>>>>>>> Stashed changes
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

<<<<<<< Updated upstream
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slide4: {
=======
    image: {
        alignItems: "center",
>>>>>>> Stashed changes
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92AAD9'
    },

<<<<<<< Updated upstream
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1
=======
    lowerText: {
        color: "white",
>>>>>>> Stashed changes
    },
    lowerView : {
<<<<<<< Updated upstream
=======
        alignItems: "center",
        backgroundColor: "#ef7c27",
>>>>>>> Stashed changes
        flex: 0.35,
        backgroundColor: '#FFCD00',
        alignItems: 'center',
        justifyContent: 'center',

<<<<<<< Updated upstream
=======
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
>>>>>>> Stashed changes
    },
    lowerText: {
        color: 'white'
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    }

});

export default Login;