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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface IProps {
    navigation: any;
}

interface IState {
    address: string;
    create_date: string;
    creator_id: string;
    desc: string;
    lat: number;
    lon: number;
    name: string;
}

const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");

class NewGroup extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

    }

    public componentDidMount() {

    }

    public submit = () => {
        // crowdsRef.push({
        //     name: this.state.name,
        //     desc: this.state.desc
        // });
        //
        // this.props.navigation.goBack(null);

    }

    public render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <TextInput
                    placeholder={"Name"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(name) => this.setState({name})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />
                <TextInput
                    placeholder={"Desc"}
                    placeholderTextColor={"rgba(255,255,255,0.8)"}
                    onChangeText={(desc) => this.setState({desc})}
                    underlineColorAndroid="rgba(0,0,0,0)"
                />

                <GooglePlacesAutocomplete
                    placeholder="Enter Location"
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={"default"}
                    fetchDetails={true}
                    styles={{
                        textInputContainer: {
                            backgroundColor: "rgba(0,0,0,0)",
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                        },
                        textInput: {
                            color: "#5d5d5d",
                            fontSize: 16,
                            height: 38,
                            marginLeft: 0,
                            marginRight: 0,
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb",
                        },
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: "AIzaSyCxbfxGUV05x6_Z0qVFmVBB1vIR1063aow",
                        language: "en", // language of the results
                    }}
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location);
                    }}
                    currentLocation={true}
                />

                <View style={styles.submitView}>
                    <TouchableOpacity onPress={this.submit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {

    },

    slide: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
    },

    slide1: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    slide2: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    slide3: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },
    slide4: {
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        flex: 1,
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },

    image: {
        flex: 1,
    },
    lowerView : {
        alignItems: "center",
        backgroundColor: "#FFCD00",
        flex: 0.35,
        justifyContent: "center",
    },
    lowerText: {
        color: "white",
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    submitView: {
        position: "absolute",
        bottom: 0,
    },

});

export default NewGroup;
