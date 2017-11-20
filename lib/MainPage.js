"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_elements_1 = require("react-native-elements");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    // console.log("Just calculated a distance.");
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
// CRASHLYTICS STUFF
const Fabric = require("react-native-fabric");
const { Crashlytics } = Fabric;
Crashlytics.setUserName("erickson");
Crashlytics.setUserEmail("conner.erickson@tufts.edu");
Crashlytics.setUserIdentifier("1234");
// Crashlytics.setBool('has_posted', 'Tufts University');
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
const crowdsRef = rootRef.child("crowds");
const dataSource = [
    { data: [], header: "Your Crowds" },
    { data: [], header: "Explore Crowds" },
];
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.checkIfExist = () => {
            itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    console.log(snapshot.val());
                    alert("Welcome Back");
                    this.setState({ name: snapshot.val().fullName });
                }
                else {
                    // TODO: Add logic for welcoming new user
                    // alert("Welcome New User!!");
                    this.props.navigation.navigate("NewUser", { UUID: this.props.navigation.state.params.UUID, returnData: this.returnName.bind(this) });
                }
            });
        };
        this.returnName = (name) => {
            this.setState({ name: name });
        };
        this.addNewGroup = () => {
            this.props.navigation.navigate("NewGroup", { _id: this.props.navigation.state.params.UUID });
        };
        // TODO: Add flatlist to display all the available groups
        // TODO: Add distance back
        this.getGroupInfo = () => {
            crowdsRef.limitToLast(20).on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                console.log(returnObj);
                let distance = getDistanceFromLatLonInKm(returnObj.lat, returnObj.lng, this.state.lat, this.state.lng);
                // if (distance <= 10) {
                const newCrowd = { name: returnObj.name, key: snapshot.key, desc: returnObj.desc };
                dataSource[1].data.push(newCrowd);
                this.forceUpdate();
                // }
                // console.log(returnObj);
            });
        };
        this.renderItem = (item) => {
            // Crashlytics.crash(); // crash test
            return <react_native_1.TouchableOpacity onPress={() => {
                for (let i = 0; i < dataSource[1].data.length; i++) {
                    if (dataSource[1].data[i].key == item.item.key) {
                        dataSource[0].data.push(dataSource[1].data[i]);
                        dataSource[1].data.splice(i, 1);
                        this.forceUpdate();
                        let crowdRef = crowdsRef.child(item.item.key);
                        alert(this.props.navigation.state.params.UUID);
                        crowdRef.push({
                            members: this.props.navigation.state.params.UUID
                        });
                    }
                }
                this.navigateToCrowd(item.item.key, item.item.name);
            }}>
            <react_native_1.View style={styles.group}>
                <react_native_1.Text style={styles.text}> {item.item.name}</react_native_1.Text>
            </react_native_1.View>
            </react_native_1.TouchableOpacity>;
        };
        this.renderHeader = (item) => {
            return <react_native_1.Text style={styles.header}>{item.section.header}</react_native_1.Text>;
        };
        this.navigateToCrowd = (crowdKey, crowdName) => {
            this.props.navigation.navigate("CrowdChat", { key: crowdKey, crowdName,
                UUID: this.props.navigation.state.params.UUID, fullName: this.state.name });
        };
        this.state = {};
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            this.getGroupInfo();
        }, (error) => console.log(new Date(), error));
    }
    componentDidMount() {
        this.props.navigation.setParams({ addNewGroup: this.addNewGroup.bind(this) });
        this.checkIfExist();
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.SectionList renderItem={this.renderItem} renderSectionHeader={this.renderHeader} sections={dataSource} keyExtractor={(item) => item.name}/>
            </react_native_1.View>);
    }
}
Main.navigationOptions = ({ navigation }) => {
    return {
        gesturesEnabled: false,
        headerLeft: null,
        headerRight: <react_native_elements_1.Icon name="add" color="#000000" size={35} onPress={() => {
            if (navigation.state.params.addNewGroup !== undefined) {
                navigation.state.params.addNewGroup();
            }
        }}/>,
        headerStyle: {
            marginTop: (react_native_1.Platform.OS === "ios") ? -20 : 0,
        },
        title: "Crowds",
    };
};
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#F3FCFF",
        flex: 1,
        justifyContent: "center",
        padding: 20,
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
});
exports.default = Main;
//# sourceMappingURL=MainPage.js.map