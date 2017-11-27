import * as React from "react";
import {
    BackHandler,
    DeviceEventEmitter,
    Dimensions,
    FlatList,
    Platform,
    SectionList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Geolocation
} from "react-native";

import {Icon, SocialIcon, Button} from "react-native-elements";
import * as Swiper from "react-native-swiper";

const {width} = Dimensions.get("window");
import * as firebase from "firebase";
import {List, ListItem, SearchBar} from "react-native-elements";
import Swipeout from 'react-native-swipeout';

import _ from "lodash";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    // console.log("Just calculated a distance.");
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

interface IProps {
    navigation: any;
}

interface IState {
    name: string,
    lat: number,
    lng: number,
}

interface ICrowd {
    name: string;
    key: string;
    desc: string;
    dis: string
}

// CRASHLYTICS STUFF
const Fabric = require("react-native-fabric");

const {Crashlytics} = Fabric;

Crashlytics.setUserName("erickson");

Crashlytics.setUserEmail("conner.erickson@tufts.edu");

Crashlytics.setUserIdentifier("1234");

// Crashlytics.setBool('has_posted', 'Tufts University');

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
const crowdsRef = rootRef.child("crowds");

var dataSource = [
    {data: [], header: "Your Crowds"},
    {data: [], header: "Explore Crowds"},
];

class Main extends React.Component<IProps> {
    public static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            headerLeft: null,
            headerTintColor: "#FFFFFF",
            headerRight: <Icon name="add" color="#FFFFFF" size={35}
                               onPress={() => {
                                   if (navigation.state.params.addNewGroup !== undefined) {
                                       navigation.state.params.addNewGroup();
                                   }
                               }}/>,
            headerStyle: {
                backgroundColor: "#003EFF",
                marginTop: (Platform.OS === 'ios') ? -20 : 0,
            },
            title: "Crowds",
        };
    };

    constructor(props: any) {
        super(props);
        this.state = {};
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            this.getGroupInfo();

        }, (error) => console.log(new Date(), error));

    }

    public componentDidMount() {
        this.props.navigation.setParams({addNewGroup: this.addNewGroup.bind(this)});
        this.checkIfExist();
    }

    public checkIfExist = () => {
        // alert(this.props.navigation.state.params.UUID);
        itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
            if (snapshot.val() !== null) {
                console.log(snapshot.val());
                alert("Welcome Back");
                this.setState({name: snapshot.val().fullName});
            } else {
                // TODO: Add logic for welcoming new user
                alert("Welcome New User!!");
                this.props.navigation.navigate("NewUser", {UUID: this.props.navigation.state.params.UUID, returnData: this.returnName.bind(this)});
            }
        });
    };

    public returnName = (name) => {
        this.setState({name: name});
    };

    public addNewGroup = () => {
        this.props.navigation.navigate("NewGroup", {_id: this.props.navigation.state.params.UUID});
    };

    // TODO: Add flatlist to display all the available groups
    // TODO: Add distance back
    public getGroupInfo = () => {
        crowdsRef.on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                let members = returnObj.members;
                let distance = getDistanceFromLatLonInKm(returnObj.lat, returnObj.lng, this.state.lat, this.state.lng);
                for (let key in members) {
                    let id = members[key].userID;
                    if (id == this.props.navigation.state.params.UUID) {
                        const newCrowd: ICrowd = {name: returnObj.name, key: snapshot.key, desc: returnObj.desc, dis: distance.toFixed(2).toString() + " kms away"};
                        dataSource[0].data.push(newCrowd);
                        this.forceUpdate();
                        return;
                    }
                }
                if (distance <= 1) {
                    const newCrowd: ICrowd = {name: returnObj.name, key: snapshot.key, desc: returnObj.desc, dis: distance.toFixed(2).toString() + " kms away"};
                    dataSource[1].data.push(newCrowd);
                    this.forceUpdate();
                }
                // console.log(returnObj);
            },
        );
    };

    public deleteGroup = (item) => {
        crowdsRef.off();
        crowdsRef.child(item.item.key).child("members").once('value', (snapshot) => {
            let members = snapshot.val();
            for (let key in members) {
                let id = members[key].userID;
                if (id == this.props.navigation.state.params.UUID) {
                    crowdsRef.child(item.item.key).child("members").child(key).remove(() => {
                        dataSource = [
                            {data: [], header: "Your Crowds"},
                            {data: [], header: "Explore Crowds"},
                        ];
                        this.getGroupInfo();
                    });
                    break;
                }
            }
        });
    };


    public renderItem = (item) => {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                this.deleteGroup(item)
            }
        }];

        if (item.section.header !== "Explore Crowds") {
            return (
                <Swipeout right={swipeBtns}>
                    <TouchableOpacity onPress={() => {
                        this.navigateToCrowd(item.item.key, item.item.name)
                    }
                    }>
                        <ListItem
                            roundAvatar
                            title={item.item.name}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <Text style={styles.ratingText}>{item.item.dis}</Text>
                                </View>
                            }
                            underlayColor={"#FFFFFF"}
                            badge={{ value: "0 messages", textStyle: { color: 'orange' }, containerStyle: { marginTop: 10 } }}
                            containerStyle={{backgroundColor: '#FFFFFF'}} />
                    </TouchableOpacity>
                </Swipeout>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    if (item.section.header === "Explore Crowds") {
                        for (let i = 0; i < dataSource[1].data.length; i++) {
                            if (dataSource[1].data[i].key == item.item.key) {
                                dataSource[0].data.push(dataSource[1].data[i]);
                                dataSource[1].data.splice(i, 1);
                                this.forceUpdate();

                                let crowdRef = crowdsRef.child(item.item.key).child('members');
                                crowdRef.push({
                                    userID: this.props.navigation.state.params.UUID
                                });
                            }
                        }
                    }
                    this.navigateToCrowd(item.item.key, item.item.name)
                }
                }>
                    <ListItem
                        roundAvatar
                        title={item.item.name}
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={styles.ratingText}>{item.item.desc}</Text>
                            </View>
                        }
                        underlayColor={"#FFFFFF"}
                        badge={{ value: item.item.dis, textStyle: { color: 'orange' }, containerStyle: { marginTop: 10 } }}
                        containerStyle={{backgroundColor: '#FFFFFF'}} />
                </TouchableOpacity>)
        }
    };

    public renderHeader = (item) => {
        return <Text style={styles.header}>{item.section.header}</Text>;
    };

    public navigateToCrowd = (crowdKey, crowdName) => {
        this.props.navigation.navigate("CrowdChat", {
            key: crowdKey, crowdName,
            UUID: this.props.navigation.state.params.UUID, fullName: this.state.name
        });
    };

    public editInfo = () => {
        this.props.navigation.navigate("EditInfo", {
            UUID: this.props.navigation.state.params.UUID
        });
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 10, marginTop: -10}}>
                    <Button
                        small
                        backgroundColor="#33A6FF"
                        onPress={this.editInfo}
                        icon={{name: 'envira', type: 'font-awesome'}}
                        title='Edit My Information'/>
                </View>
                <SectionList
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderHeader}
                    sections={dataSource}
                    keyExtractor={(item) => item.name}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FCFF",
        flex: 1,
        justifyContent: "center",
        paddingTop: 40,
    },

    group: {
        alignSelf: "stretch",
        backgroundColor: "#fd9d64",
        height: 50,
        marginBottom: 5,
    },

    header: {
        fontFamily: "sans-serif-thin",
        fontSize: 30,
    },

    wrapper: {},

    text: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold",
    },

    textView: {
        marginLeft: 40,
        marginRight: 40,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }

});

export default Main;
