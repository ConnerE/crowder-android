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
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    BackHandler,
    StatusBar,
    Dimensions
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
            buttonClicked: false,
        };
    }

    loginPressed = () => {
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <View style={{flex: 1}}>
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
        flex: 1
    },

    wrapper: {

    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92AAD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1
    },
    lowerView : {
        flex: 0.35,
        backgroundColor: '#FFCD00',
        alignItems: 'center',
        justifyContent: 'center',

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