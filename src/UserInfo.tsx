// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
import * as React from "react";
import {
    BackHandler,
    DeviceEventEmitter,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SocialIcon } from "react-native-elements";
import * as Swiper from "react-native-swiper";
const {width} = Dimensions.get("window");
import * as firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';


interface IProps {
    navigation: any;
}

interface IState {
    aboutMe: string;
    email: string;
    fullName: string;
    jobTitle: string;
    photo_url: string;
    school: string;
    ready: boolean
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");

class UserInfo extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
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

    public getUserInfo = () => {
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
            } else {
                alert('You have just found a bug')
            }
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                {!this.state.ready && (<Text>Loading....</Text>)}
                {this.state.ready && (
                    <View>
                        <Text style={styles.titleText}>Hi, I'm {this.state.fullName}</Text>
                        <Text style={styles.aboutText}>{this.state.aboutMe}</Text>


                        <View style={styles.iconText}>
                            <View>
                                <Icon name="graduation-cap" size={20} color="#1d24ff" />
                            </View>
                            <View>
                                <Text style={styles.text}>  {this.state.school}</Text>
                            </View>
                        </View>

                        <View style={styles.iconText}>
                            <View>
                                <Icon name="briefcase" size={20} color="#1d24ff" />
                            </View>
                            <View>
                                <Text style={styles.text}>    {this.state.jobTitle}</Text>
                            </View>
                        </View>

                        <View style={styles.iconText}>
                            <View>
                                <Icon name="mail-alt" size={20} color="#1d24ff" />
                            </View>
                            <View>
                                <Text style={styles.text}>    {this.state.email}</Text>
                            </View>
                        </View>



                    </View>)}


            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    wrapper: {
    },
});

export default UserInfo;
