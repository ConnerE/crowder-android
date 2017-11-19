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
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getUserInfo = () => {
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
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                {!this.state.ready && (<react_native_1.Text>Loading....</react_native_1.Text>)}
                {this.state.ready && (<react_native_1.View>
                    <react_native_1.Text>{this.state.fullName}</react_native_1.Text>
                    <react_native_1.Text>{this.state.aboutMe}</react_native_1.Text>
                    <react_native_1.Text>{this.state.email}</react_native_1.Text>
                    <react_native_1.Text>{this.state.school}</react_native_1.Text>
                    <react_native_1.Text>{this.state.jobTitle}</react_native_1.Text>
                </react_native_1.View>)}


            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
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
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    wrapper: {},
});
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map