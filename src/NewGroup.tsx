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
    ScrollView
} from "react-native";

import {SocialIcon, Button} from "react-native-elements";
var MapView = require('react-native-maps');
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get("window");
import * as firebase from "firebase";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

interface IProps {
    navigation: any;
}

interface IState {
    desc: string;
    lat: number;
    lng: number;
    name: string;
    region: any
}

const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");

class NewGroup extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            desc: '',
            lat: 0,
            lng: 0,
            name: '',
            region: {
                latitude: 42.405804,
                longitude: -71.11956,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
            }
        };
    }

    map: any;
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Creating New Crowd',
            headerTintColor: "#FFFFFF",
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
        };
    };

    public submit = () => {
        if (this.state.name == "" || this.state.desc == "") {
            alert('Please input value for all fields');
            return;
        }

        if (this.state.lat == 0 || this.state.lng == 0) {
            alert('Please input location');
            return;
        }

        crowdsRef.push({
            name: this.state.name,
            desc: this.state.desc,
            lat: this.state.lat,
            lng: this.state.lng,
            members: {admin: {userID: this.props.navigation.state.params._id}}
        });

        this.props.navigation.goBack(null);
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <ScrollView>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="search" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"What's your crowd name"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(name) => this.setState({name})}
                                underlineColorAndroid="#003EFF"
                            />
                        </View>
                    </View>
                    <View style={styles.iconText}>
                        <View style={{marginTop: 20, flex: 0.08}}>
                            <Icon name="heart" size={20} color="#1d24ff"/>
                        </View>
                        <View style={{flex: 0.92}}>
                            <TextInput
                                placeholder={"Describe the functionality of your crowd"}
                                placeholderTextColor={"#003EFF"}
                                onChangeText={(desc) => this.setState({desc})}
                                underlineColorAndroid="#003EFF"
                            />
                        </View>
                    </View>
                            <GooglePlacesAutocomplete
                                placeholder="Enter Locations"
                                placeholderTextColor={"#003EFF"}
                                minLength={2}
                                autoFocus={false}
                                underlineColorAndroid="#003EFF"
                                returnKeyType={"default"}
                                fetchDetails={true}
                                styles={{
                                    predefinedPlacesDescription: {
                                        color: "#003EFF",
                                    },
                                    textInput: {
                                        color: "#003EFF",
                                        height: 38,
                                        backgroundColor: "white",

                                    },
                                    textInputContainer: {
                                        borderBottomWidth: 0,
                                        borderTopWidth: 0,
                                        backgroundColor: "white",
                                    },
                                }}
                                query={{
                                    key: "AIzaSyCxbfxGUV05x6_Z0qVFmVBB1vIR1063aow",
                                    language: "en", // language of the results
                                }}
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    let newRegin = {
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.01,
                                    };
                                    this.setState({
                                        lat: details.geometry.location.lat,
                                        lng: details.geometry.location.lng,
                                        region: newRegin
                                    });
                                    this.map.animateToRegion(newRegin, 2);
                                }}
                                currentLocation={true}
                            />
                    <View style={styles.mapView}>
                        <MapView
                            style={{
                                height: Dimensions.get('window').height * 0.4,
                                width: Dimensions.get('window').width,
                                margin: 0
                            }}
                            initialRegion={this.state.region}
                            showsUserLocation={true}
                            ref={ref => {
                                this.map = ref;
                            }}
                        >
                            {this.state.lat !== 0 && <MapView.Marker
                                coordinate={this.state.region}
                                title={"Here is your group"}
                            />}
                        </MapView>
                    </View>
                    <View style={{marginTop: 20, marginBottom:20}}>
                        <Button
                            small
                            backgroundColor="#003EFF"
                            onPress={this.submit}
                            icon={{name: 'envira', type: 'font-awesome'}}
                            title='Submit'/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    iconText: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20
    },
    mapView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    }
});

export default NewGroup;
