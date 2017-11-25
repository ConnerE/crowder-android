"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
let storageRef = firebase.storage().ref();
class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.returnUrl = (url) => {
            console.log(url);
            this.setState({ url: url });
        };
        this.submit = () => {
            itemsRef.update({
                [this.props.navigation.state.params.UUID]: {
                    aboutMe: this.state.aboutMe,
                    email: this.state.email,
                    fullName: this.state.fullName,
                    jobTitle: this.state.jobTitle,
                    school: this.state.school,
                },
            });
            this.props.navigation.state.params.returnData(this.state.fullName);
            this.props.navigation.goBack(null);
        };
        this.updatePicture = () => {
            react_native_1.Alert.alert('Choosing sources', 'Place choose below', [
                { text: 'Camera Roll', onPress: () => { this.props.navigation.navigate("PicturePicking", { UUID: this.props.navigation.state.params.UUID, returnUrl: this.returnUrl.bind(this) }); } },
                { text: 'Take Picture', onPress: () => { this.props.navigation.navigate("Camera", { UUID: this.props.navigation.state.params.UUID, returnUrl: this.returnUrl.bind(this) }); } },
                { text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel' },
            ], { cancelable: false });
        };
        this.state = {
            url: "",
            aboutMe: "",
            email: "",
            fullName: "",
            jobTitle: "",
            school: ""
        };
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.TouchableOpacity onPress={this.updatePicture}>
                    <react_native_1.Text>
                        Update Picture
                    </react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={this.try}>
                    <react_native_1.Text>
                        Try Picture
                    </react_native_1.Text>
                </react_native_1.TouchableOpacity>

                {this.state.url !== '' && <react_native_1.Image style={{ width: 50, height: 50 }} source={{ uri: this.state.url }}/>}


                <react_native_1.TextInput placeholder={"About Me"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(aboutMe) => this.setState({ aboutMe })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"Email"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(email) => this.setState({ email })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"Full Name"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(fullName) => this.setState({ fullName })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"Job Title"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(jobTitle) => this.setState({ jobTitle })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"School"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(school) => this.setState({ school })} underlineColorAndroid="rgba(0,0,0,0)"/>

                <react_native_1.TouchableOpacity onPress={this.submit}>
                    <react_native_1.Text>Submit</react_native_1.Text>
                </react_native_1.TouchableOpacity>

            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {},
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    image: {
        flex: 1,
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
});
exports.default = NewUser;
//# sourceMappingURL=NewUser.js.map