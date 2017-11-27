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
    name: string;
    region: any
}

const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");

class GroupInfo extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            desc: '',
            name: '',
            region: {
                latitude: 42.405804,
                longitude: -71.11956,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
            }
        };
    }

    componentDidMount() {
        this.getGroupInfo();
    }
    map: any;
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Crowd Information',
            headerTintColor: "#FFFFFF",
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
        };
    };

    public getGroupInfo = () => {
        crowdsRef.child(this.props.navigation.state.params.groupID).once("value", (snapshot) => {
            let returnObj = snapshot.val();
            let region = {
                latitude: returnObj.lat,
                longitude: returnObj.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
            };

            this.setState({
                region: region,
                name: returnObj.name,
                desc: returnObj.desc
            });

            this.map.animateToRegion(region, 2);
        })
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                    <View style={styles.mapView}>
                        <MapView
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width,
                                margin: 0
                            }}
                            initialRegion={this.state.region}
                            showsUserLocation={true}
                            ref={ref => {
                                this.map = ref;
                            }}
                        >
                            {this.state.name !== "" && <MapView.Marker
                                coordinate={this.state.region}
                                title={this.state.name}
                                description={this.state.desc}
                            />}
                        </MapView>
                    </View>
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
        flex: 1,
    }
});

export default GroupInfo;
