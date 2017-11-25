"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
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
            // this.props.navigation.navigate("PicturePicking")
            this.props.navigation.navigate("Main", { UUID: this.state.tempUUID });
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
                    <react_native_1.TextInput placeholder={"Temp UUID"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(tempUUID) => this.setState({ tempUUID })} underlineColorAndroid="rgba(0,0,0,0)"/>
                    <react_native_1.TouchableOpacity onPress={this.loginPressed}>
                        <react_native_1.Text>
                        PH
                        </react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                    
                        
                        
                        
                        
                        
                    
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