/* This is the login page for choosing the probes
 * Algo: The system will check whether the user has a preferred probe, if yes, scan the devices around, and if that
 * probe exists, connect to the probe automatically. After 10 seconds, the user will be about to choose other available
 * probes around, and the preferred probed will be changed automatically
 *
 * TODO: Catch all the errors / Get rid of all the weird warnings
 * TODO: Add color to the buttons next to the English description
 * by: Philip Wang
 * on: June 15th, 2017
 */

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
} from "react-native";

import { Icon, SocialIcon } from "react-native-elements";
import * as Swiper from "react-native-swiper";
const {width} = Dimensions.get("window");
import * as firebase from "firebase";
import { List, ListItem, SearchBar } from "react-native-elements";

interface IProps {
    navigation: any;
}

interface IState {}

interface ICrowd {
    name: string;
    key: string;
    desc: string;
}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
const crowdsRef = rootRef.child("crowds");

const dataSource = [
    {data: [], header: "My Crowd"},
    {data: [], header: "Crowds that might interest you"},
];

class Main extends React.Component<IProps, IState> {
    public static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            headerLeft: null,
            headerRight: <Icon name="add" color="#000000" size={35}
                               onPress={() => {
                                   if (navigation.state.params.addNewGroup !== undefined) {
                                       navigation.state.params.addNewGroup();
                                   }
                               }}/>,
            headerStyle: {
                marginTop: (Platform.OS === "ios") ? -20 : 0,
                title: "Crowds",
            },
        };
    }

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.props.navigation.setParams({addNewGroup: this.addNewGroup.bind(this)});
        this.checkIfExist();
    }

    public checkIfExist = () => {
        itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
            if (snapshot.val() !== null) {
                alert("Welcome Back");
                this.getGroupInfo();
            } else {
                this.getGroupInfo();
                // TODO: Add logic for welcoming new user
                alert("Welcome New User!!");
                this.props.navigation.navigate("NewUser", {UUID: this.props.navigation.state.params.UUID});
            }
        });
    }

    public addNewGroup = () => {
        this.props.navigation.navigate("NewGroup");
    }

    // TODO: Add flatlist to display all the available groups
    public getGroupInfo = () => {
        crowdsRef.limitToLast(20).on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                const newCrowd: ICrowd = {name: returnObj.name, key: snapshot.key, desc: returnObj.desc};
                dataSource[0].data.push(newCrowd);
                this.forceUpdate();
                console.log(returnObj);
            },
        );
    }

    public renderItem = (item) => {
        return <TouchableOpacity onPress={() => this.navigateToCrowd(item.item.key, item.item.name)}>
            <Text>{item.item.name}</Text>
            </TouchableOpacity>;
    }

    public renderHeader = (item) => {
        return <Text>{item.section.header}</Text>;
    }

    public navigateToCrowd = (crowdKey, crowdName) => {
        this.props.navigation.navigate("CrowdChat", {key: crowdKey, crowdName,
                                                     UUID: this.props.navigation.state.params.UUID});
    }

    public render() {
        return (
            <View style={styles.container}>
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
        flex: 1,
    },

    image: {
        flex: 1,
    },

    lowerText: {
        color: "white",
    },

    lowerView : {
        alignItems: "center",
        backgroundColor: "#FFCD00",
        flex: 0.35,
        justifyContent: "center",

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

    textView: {
        marginLeft: 40,
        marginRight: 40,
    },

    wrapper: {

    },
});

export default Main;
