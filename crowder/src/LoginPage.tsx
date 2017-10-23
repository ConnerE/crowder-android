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
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


interface Props {
    navigator: any;
}

interface State {

}


class Login extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            buttonClicked: false,
        };

        this.props.navigator.setStyle({
            navBarHidden: true,
        });
    }

    loginPressed = () => {

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
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                this.props.navigator.push({
                    screen: 'Main', // unique ID registered with Navigation.registerScreen
                    passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                    navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                    navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                });
                console.warn(JSON.stringify(currentUser.toJSON()));
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });

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