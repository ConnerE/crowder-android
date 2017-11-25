"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_elements_1 = require("react-native-elements");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const react_native_fbsdk_1 = require("react-native-fbsdk");
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
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                // login with credential
                console.log(firebase);
                console.log(credential);
                return firebase.auth().signInWithCredential(credential);
            })
                .then((currentUser) => {
                this.props.navigation.navigate("Main", { UUID: currentUser.uid });
            })
                .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
            // this.props.navigation.navigate("PicturePicking")
            // this.props.navigation.navigate("Main", {UUID: 'q'});
        };
        this.state = {
            tempUUID: "",
        };
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.View style={{ flex: 0.65 }}>
                    
                        
                            
                                
                                
                                
                            
                            
                        

                        
                            
                                
                                
                            
                                
                            
                        

                        
                            
                                
                                
                            
                                
                            
                        

                        
                            
                                
                                
                            
                                
                            
                        

                    
                </react_native_1.View>
                <react_native_1.View style={styles.lowerView}>
                    
                        
                        
                        
                        
                    
                    
                        
                        
                        
                    
                    <react_native_elements_1.SocialIcon title="Sign In With Facebook" button type="facebook" style={{ width: width - 40, marginBottom: 40 }} onPress={this.loginPressed}/>
                    <react_native_1.View style={styles.textView}>
                        <react_native_1.Text style={styles.lowerText}>We use facebook to identify whether you are a zombie.</react_native_1.Text>
                        <react_native_1.Text style={styles.lowerText}>In our experience, zombies don't do well in crowds.</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>);
    }
}
Login.navigationOptions = {
    header: null,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
    },
    wrapper: {},
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
    lowerView: {
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
exports.default = Login;
//# sourceMappingURL=LoginPage.js.map