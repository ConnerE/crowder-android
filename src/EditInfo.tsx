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
    Image,
    Alert,
    ScrollView,
} from "react-native";

import {SocialIcon, Button} from "react-native-elements";
import * as Swiper from "react-native-swiper";
import CameraRollPicker from 'react-native-camera-roll-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get("window");
import * as firebase from "firebase";

interface IProps {
    navigation: any;
}

interface IState {
    aboutMe: string;
    email: string;
    fullName: string;
    jobTitle: string;
    school: string;
    url: string;
    pictureDone: boolean
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
let storageRef = firebase.storage().ref();
import {Icon} from "react-native-elements";

class EditInfo extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
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
        this.props.navigation.setParams({submit: this.submit.bind(this)});
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Creating User Info',
            headerTintColor: "#FFFFFF",
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
        };
    };

    public returnUrl = (url) => {
        this.setState({url: url, pictureDone: true});
    };

    public getUserInfo = () => {
        itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
            if (snapshot.val() !== null) {
                this.setState({
                    aboutMe: snapshot.val().aboutMe,
                    email: snapshot.val().email,
                    fullName: snapshot.val().fullName,
                    jobTitle: snapshot.val().jobTitle,
                    school: snapshot.val().school,
                });
            } else {
                alert('You have just found a bug')
            }
        });

        storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
            this.setState({url: url})
        }).catch(function(error) {
            alert(error);
        });
    };

    public submit = () => {
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

    public updatePicture = () => {
        Alert.alert(
            'Choosing sources',
            'Place choose below',
            [
                {
                    text: 'Camera Roll', onPress: () => {
                    this.props.navigation.navigate("PicturePicking", {
                        UUID: this.props.navigation.state.params.UUID,
                        returnUrl: this.returnUrl.bind(this)
                    })
                }
                },
                {
                    text: 'Take Picture', onPress: () => {
                    this.props.navigation.navigate("Camera", {
                        UUID: this.props.navigation.state.params.UUID,
                        returnUrl: this.returnUrl.bind(this)
                    })
                }
                },
                {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        );
    };


    public render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={styles.pictureViewBig} onPress={this.updatePicture}>
                    {this.state.url !== '' && <Image
                        style={styles.pictureViewSmall}
                        source={{uri: this.state.url}}
                    />}
                    {this.state.url === '' && <Image
                        style={styles.pictureViewSmall}
                        source={require('../asset/profileP.png')}
                    />}
                </TouchableOpacity>
                <ScrollView style={{marginTop: 20}}>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="user" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"Full Name"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(fullName) => this.setState({fullName})}
                                underlineColorAndroid="#003EFF"
                                defaultValue={this.state.fullName}
                            />
                        </View>
                    </View>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="mail-forward" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"Email"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(email) => this.setState({email})}
                                underlineColorAndroid="#003EFF"
                                defaultValue={this.state.email}
                            />
                        </View>
                    </View>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="book" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"Graduating University"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(school) => this.setState({school})}
                                underlineColorAndroid="#003EFF"
                                defaultValue={this.state.school}
                            />
                        </View>
                    </View>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="briefcase" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"Job Title"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(jobTitle) => this.setState({jobTitle})}
                                underlineColorAndroid="#003EFF"
                                defaultValue={this.state.jobTitle}
                            />
                        </View>
                    </View>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="info" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"About Me"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(aboutMe) => this.setState({aboutMe})}
                                underlineColorAndroid="#003EFF"
                                defaultValue={this.state.aboutMe}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{marginTop: 20, marginBottom:20}}>
                    <Button
                        small
                        backgroundColor="#003EFF"
                        onPress={this.submit}
                        icon={{name: 'envira', type: 'font-awesome'}}
                        title='Submit'/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

export default EditInfo;
