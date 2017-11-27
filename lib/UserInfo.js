"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
const React = require("react");
const react_native_1 = require("react-native");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
let storageRef = firebase.storage().ref();
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getUserInfo = () => {
            // console.log("Getting user info.");
            itemsRef.child(this.props.navigation.state.params._id).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    this.setState({
                        aboutMe: snapshot.val().aboutMe,
                        email: snapshot.val().email,
                        fullName: snapshot.val().fullName,
                        jobTitle: snapshot.val().jobTitle,
                        school: snapshot.val().school,
                        ready: true
                    });
                }
                else {
                    alert('You have just found a bug');
                }
            });
            storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
                this.setState({ photo_url: url });
            }).catch(function (error) {
                alert(error);
            });
        };
        this.state = {
            aboutMe: "",
            email: "",
            fullName: "",
            jobTitle: "",
            school: "",
            ready: false,
            photo_url: ""
        };
        this.getUserInfo();
    }
    render() {
        return (<react_native_1.View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <react_native_1.StatusBar hidden={true}/>
                {!this.state.ready && (<react_native_1.Text>Loading....</react_native_1.Text>)}
                {this.state.ready && (<react_native_1.ScrollView style={{ marginTop: 20 }}>
                        <react_native_1.View style={styles.slide}>
                            {this.state.photo_url !== '' && <react_native_1.ImageBackground style={styles.pictureView} source={{ uri: this.state.photo_url }}/>}
                            {this.state.photo_url === '' && <react_native_1.ImageBackground style={styles.pictureView} source={require('../asset/profileP.png')}/>}
                        </react_native_1.View>

                        <react_native_1.View>

                            <react_native_1.View style={{ flex: 0.92 }}>
                                <react_native_1.Text style={styles.titleText}>{this.state.fullName}, {this.state.school}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>


                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View style={{ marginTop: 30, flex: 0.08 }}>
                                <FontAwesome_1.default name="mail-forward" size={20} color="#1d24ff"/>
                            </react_native_1.View>
                            <react_native_1.View style={{ flex: 0.92 }}>
                                <react_native_1.Text style={styles.text}>{this.state.email}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>

                        <react_native_1.View style={styles.underline}/>


                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                                <FontAwesome_1.default name="briefcase" size={20} color="#1d24ff"/>
                            </react_native_1.View>
                            <react_native_1.View style={{ flex: 0.92 }}>
                                <react_native_1.Text style={styles.text}>{this.state.jobTitle}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>

                        <react_native_1.View style={styles.underline}/>

                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View style={{ flex: 0.92 }}>
                                <react_native_1.Text style={styles.aboutText}>{this.state.aboutMe}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>



                    </react_native_1.ScrollView>)}


            </react_native_1.View>);
    }
}
UserInfo.navigationOptions = ({ navigation }) => {
    return {
        title: 'User Information',
        headerTintColor: "#FFFFFF",
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: "#003EFF",
            marginTop: (react_native_1.Platform.OS === 'ios') ? -20 : 0,
        },
    };
};
const styles = react_native_1.StyleSheet.create({
    aboutText: {
        color: "#000000",
        fontSize: 15,
        textAlign: "center",
        paddingTop: 15,
    },
    container: {
        flex: 1,
    },
    iconText: {
        alignItems: 'center',
        flexDirection: "row",
        // paddingTop: 15,
        paddingLeft: 15,
    },
    image: {
        flex: 1,
    },
    pictureView: {
        width: width * 0.5,
        height: width * 0.5,
        marginLeft: width * 0.25,
        marginTop: 20
    },
    slide: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
    },
    submitView: {
        bottom: 0,
        position: "absolute",
    },
    titleText: {
        color: "#000000",
        fontSize: 23,
        paddingTop: 15,
        fontFamily: "SFCartoonistHand-Bold",
        textAlign: "center",
    },
    text: {
        flex: -1.00,
        color: "#000000",
        fontSize: 12,
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    underline: {
        borderTopColor: '#003EFF',
        borderTopWidth: 1,
        marginLeft: 40,
        marginRight: 4,
    },
    wrapper: {},
});
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map