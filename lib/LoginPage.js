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
const firebase = require("firebase");
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
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginPressed = () => {
            this.props.navigation.navigate('Main', { UUID: this.state.tempUUID });
        };
        this.state = {
            tempUUID: ''
        };
    }
    render() {
        return (<react_native_1.View style={styles.container}>
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
                    <react_native_1.TextInput placeholder={"Temp UUID"} placeholderTextColor={'rgba(255,255,255,0.8)'} onChangeText={(tempUUID) => this.setState({ tempUUID })} underlineColorAndroid='rgba(0,0,0,0)'/>
                    <react_native_elements_1.SocialIcon title='Sign In With Facebook' button type='facebook' style={{ width: width - 40, marginBottom: 40 }} onPress={this.loginPressed}/>
                    <react_native_1.View style={styles.textView}>
                        <react_native_1.Text style={styles.lowerText}>We use facebook to identify whether you are a human or a zombie.</react_native_1.Text>
                        <react_native_1.Text style={styles.lowerText}>In our experience, zombies tend to eat human brains, and well we don’t want that in our crowds.</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>);
    }
}
Login.navigationOptions = {
    header: null
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {},
    slide: {
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