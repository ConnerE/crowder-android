"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Swiper = require("react-native-swiper");
const react_native_elements_1 = require("react-native-elements");
const { width } = react_native_1.Dimensions.get('window');
const react_native_fbsdk_1 = require("react-native-fbsdk");
const react_native_firebase_1 = require("react-native-firebase");
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginPressed = () => {
            react_native_fbsdk_1.LoginManager
                .logInWithReadPermissions(['public_profile', 'email'])
                .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                // get the access token
                return react_native_fbsdk_1.AccessToken.getCurrentAccessToken();
            })
                .then(data => {
                // create a new firebase credential with the token
                const credential = react_native_firebase_1.default.auth.FacebookAuthProvider.credential(data.accessToken);
                // login with credential
                console.log(react_native_firebase_1.default);
                return react_native_firebase_1.default.auth().signInWithCredential(credential);
            })
                .then((currentUser) => {
                this.props.navigator.push({
                    screen: 'Main',
                    passProps: {},
                    animated: true,
                    animationType: 'fade',
                    backButtonHidden: false,
                    navigatorStyle: {},
                    navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                });
                console.warn(JSON.stringify(currentUser.toJSON()));
            })
                .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
        };
        this.state = {
            buttonClicked: false,
        };
        this.props.navigator.setStyle({
            navBarHidden: true,
        });
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.View style={{ flex: 0.65 }}>
                    <Swiper style={styles.wrapper} horizontal={true} autoplay>
                        <react_native_1.View style={styles.slide1}>
                            <react_native_1.Text style={styles.text}>Welcome to Crownder</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.View style={styles.slide2}>
                            <react_native_1.Text style={styles.text}>I don't know what to write</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.View style={styles.slide3}>
                            <react_native_1.Text style={styles.text}>Conner is suppose to do this part</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.View style={styles.slide4}>
                            <react_native_1.Text style={styles.text}>And yeaaa</react_native_1.Text>
                        </react_native_1.View>
                    </Swiper>
                </react_native_1.View>
                <react_native_1.View style={styles.lowerView}>
                    <react_native_elements_1.SocialIcon title='Sign In With Facebook' button type='facebook' style={{ width: width - 40, marginBottom: 40 }} onPress={this.loginPressed}/>
                    <react_native_1.View style={styles.textView}>
                        <react_native_1.Text style={styles.lowerText}>We use facebook to identify whether you are a human or a zombie.</react_native_1.Text>
                        <react_native_1.Text style={styles.lowerText}>In our experience, zombies tend to eat human brains, and well we don’t want that in our crowds.</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {},
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
    lowerView: {
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
exports.default = Login;
//# sourceMappingURL=LoginPage.js.map