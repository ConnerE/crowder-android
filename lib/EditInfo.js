"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_elements_1 = require("react-native-elements");
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
let storageRef = firebase.storage().ref();
class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        this.returnUrl = (url) => {
            this.setState({ url: url, pictureDone: true });
        };
        this.getUserInfo = () => {
            itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    this.setState({
                        aboutMe: snapshot.val().aboutMe,
                        email: snapshot.val().email,
                        fullName: snapshot.val().fullName,
                        jobTitle: snapshot.val().jobTitle,
                        school: snapshot.val().school,
                    });
                }
                else {
                    alert('You have just found a bug');
                }
            });
            storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
                this.setState({ url: url });
            }).catch(function (error) {
                alert(error);
            });
        };
        this.submit = () => {
            if (this.state.aboutMe == "" || this.state.email == "" || this.state.fullName == "" || this.state.jobTitle == "" || this.state.school == "") {
                alert('Please fill in information for all');
                return;
            }
            if (this.state.url == "") {
                alert('Please check your internet connection');
                return;
            }
            itemsRef.update({
                [this.props.navigation.state.params.UUID]: {
                    aboutMe: this.state.aboutMe,
                    email: this.state.email,
                    fullName: this.state.fullName,
                    jobTitle: this.state.jobTitle,
                    school: this.state.school,
                },
            });
            this.props.navigation.goBack(null);
        };
        this.updatePicture = () => {
            react_native_1.Alert.alert('Choosing sources', 'Place choose below', [
                {
                    text: 'Camera Roll', onPress: () => {
                        this.props.navigation.navigate("PicturePicking", {
                            UUID: this.props.navigation.state.params.UUID,
                            returnUrl: this.returnUrl.bind(this)
                        });
                    }
                },
                {
                    text: 'Take Picture', onPress: () => {
                        this.props.navigation.navigate("Camera", {
                            UUID: this.props.navigation.state.params.UUID,
                            returnUrl: this.returnUrl.bind(this)
                        });
                    }
                },
                { text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel' },
            ], { cancelable: false });
        };
        this.state = {
            url: "",
            aboutMe: "",
            email: "",
            fullName: "",
            jobTitle: "",
            school: "",
            pictureDone: false
        };
    }
    componentDidMount() {
        this.getUserInfo();
        this.props.navigation.setParams({ submit: this.submit.bind(this) });
    }
    render() {
        return (<react_native_1.View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.TouchableOpacity style={styles.pictureViewBig} onPress={this.updatePicture}>
                    {this.state.url !== '' && <react_native_1.Image style={styles.pictureViewSmall} source={{ uri: this.state.url }}/>}
                    {this.state.url === '' && <react_native_1.Image style={styles.pictureViewSmall} source={require('../asset/profileP.png')}/>}
                </react_native_1.TouchableOpacity>
                <react_native_1.ScrollView style={{ marginTop: 20 }}>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="user" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"Full Name"} placeholderTextColor={"#003EFF"} onChangeText={(fullName) => this.setState({ fullName })} underlineColorAndroid="#003EFF" defaultValue={this.state.fullName}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="mail-forward" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"Email"} placeholderTextColor={"#003EFF"} onChangeText={(email) => this.setState({ email })} underlineColorAndroid="#003EFF" defaultValue={this.state.email}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="book" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"Graduating University"} placeholderTextColor={"#003EFF"} onChangeText={(school) => this.setState({ school })} underlineColorAndroid="#003EFF" defaultValue={this.state.school}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="briefcase" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"Job Title"} placeholderTextColor={"#003EFF"} onChangeText={(jobTitle) => this.setState({ jobTitle })} underlineColorAndroid="#003EFF" defaultValue={this.state.jobTitle}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="info" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"About Me"} placeholderTextColor={"#003EFF"} onChangeText={(aboutMe) => this.setState({ aboutMe })} underlineColorAndroid="#003EFF" defaultValue={this.state.aboutMe}/>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.ScrollView>
                <react_native_1.View style={{ marginTop: 20, marginBottom: 20 }}>
                    <react_native_elements_1.Button small backgroundColor="#003EFF" onPress={this.submit} icon={{ name: 'envira', type: 'font-awesome' }} title='Submit'/>
                </react_native_1.View>
            </react_native_1.View>);
    }
}
EditInfo.navigationOptions = ({ navigation }) => {
    return {
        title: 'Creating User Info',
        headerTintColor: "#FFFFFF",
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: "#003EFF",
            marginTop: (react_native_1.Platform.OS === 'ios') ? -20 : 0,
        },
    };
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    pictureViewBig: {
        width: width * 0.5,
        height: width * 0.5,
        marginLeft: width * 0.25,
        marginTop: 20
    },
    pictureViewSmall: {
        width: width * 0.5,
        height: width * 0.5,
    },
    iconText: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20
    },
});
exports.default = EditInfo;
//# sourceMappingURL=EditInfo.js.map