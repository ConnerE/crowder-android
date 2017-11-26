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
                        <react_native_1.Text style={styles.titleText}>Hi, I'm {this.state.fullName}</react_native_1.Text>
                        <react_native_1.Text style={styles.aboutText}>{this.state.aboutMe}</react_native_1.Text>


                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View>
                                <FontAwesome_1.default name="graduation-cap" size={20} color="#1d24ff"/>
                            </react_native_1.View>
                            <react_native_1.View>
                                <react_native_1.Text style={styles.text}>  {this.state.school}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>

                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View>
                                <FontAwesome_1.default name="briefcase" size={20} color="#1d24ff"/>
                            </react_native_1.View>
                            <react_native_1.View>
                                <react_native_1.Text style={styles.text}>    {this.state.jobTitle}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>

                        <react_native_1.View style={styles.iconText}>
                            <react_native_1.View>
                                <FontAwesome_1.default name="mail-alt" size={20} color="#1d24ff"/>
                            </react_native_1.View>
                            <react_native_1.View>
                                <react_native_1.Text style={styles.text}>    {this.state.email}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>



                    </react_native_1.View>)}


            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    aboutText: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        flex: 1,
    },
    iconText: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
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
    titleText: {
        color: "#000000",
        fontSize: 50,
        fontFamily: "SFCartoonistHand-Bold",
        textAlign: "center",
    },
    text: {
        color: "#00096a",
        fontSize: 12,
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    wrapper: {},
});
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map