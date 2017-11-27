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
    ImageBackground,
    Platform,
    ScrollView,
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
let storageRef = firebase.storage().ref();

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

    static navigationOptions = ({navigation}) => {
        return {
            title: 'User Information',
            headerTintColor: "#FFFFFF",
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
        };
    };

    public getUserInfo = () => {
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
            } else {
                alert('You have just found a bug')
            }
        });

        storageRef.child(this.props.navigation.state.params._id + '.jpg').getDownloadURL().then((url) => {
            this.setState({photo_url: url})
        }).catch(function(error) {
            alert(error);
        });
    };

    render() {

        return (
            <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
                <StatusBar hidden={true}/>
                {!this.state.ready && (<Text>Loading....</Text>)}
                {this.state.ready && (
                    <ScrollView style={{marginTop: 20}}>
                        <View style={styles.slide}>
                            {this.state.photo_url !== '' && <ImageBackground
                                style={styles.pictureView}
                                source={{uri: this.state.photo_url}}
                            />}
                            {this.state.photo_url === '' && <ImageBackground
                                style={styles.pictureView}

                                source={require('../asset/profileP.png')}
                            />}
                        </View>

                        <View>

                            <View style={{flex: 0.92}}>
                                <Text style={styles.titleText}>{this.state.fullName}, {this.state.school}</Text>
                            </View>
                        </View>


                        <View style={styles.iconText}>
                            <View style={{marginTop: 30, flex: 0.08}}>
                                <Icon name="mail-forward" size={20} color="#1d24ff"/>
                            </View>
                            <View style={{flex: 0.92}}>
                                <Text style={styles.text}>{this.state.email}</Text>
                            </View>
                        </View>

                        <View style={styles.underline}/>


                        <View style={styles.iconText}>
                            <View style={{marginTop: 20, flex: 0.08}}>
                                <Icon name="briefcase" size={20} color="#1d24ff"/>
                            </View>
                            <View style={{flex: 0.92}}>
                                <Text style={styles.text}>{this.state.jobTitle}</Text>
                            </View>
                        </View>

                        <View style={styles.underline}/>

                        <View style={styles.iconText}>
                            <View style={{flex: 0.92}}>
                                <Text style={styles.aboutText}>{this.state.aboutMe}</Text>
                            </View>
                        </View>



                    </ScrollView>)}


            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        // paddingTop: 10,

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
    wrapper: {
    },
});

export default UserInfo;
