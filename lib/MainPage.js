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
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child("users");
const crowdsRef = rootRef.child("crowds");
const dataSource = [
    { data: [], header: "My Crowd" },
    { data: [], header: "Crowds that might interest you" },
];
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.checkIfExist = () => {
            itemsRef.child(this.props.navigation.state.params.UUID).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    alert("Welcome Back");
                    this.getGroupInfo();
                }
                else {
                    this.getGroupInfo();
                    // TODO: Add logic for welcoming new user
                    alert("Welcome New User!!");
                    this.props.navigation.navigate("NewUser", { UUID: this.props.navigation.state.params.UUID });
                }
            });
        };
        this.addNewGroup = () => {
            this.props.navigation.navigate("NewGroup");
        };
        // TODO: Add flatlist to display all the available groups
        this.getGroupInfo = () => {
            crowdsRef.limitToLast(20).on("child_added", (snapshot) => {
                const returnObj = snapshot.val();
                const newCrowd = { name: returnObj.name, key: snapshot.key, desc: returnObj.desc };
                dataSource[0].data.push(newCrowd);
                this.forceUpdate();
                // console.log(returnObj);
            });
        };
        this.renderItem = (item) => {
            return <react_native_1.TouchableOpacity onPress={() => this.navigateToCrowd(item.item.key, item.item.name)}>
            <react_native_1.Text>{item.item.name}</react_native_1.Text>
            </react_native_1.TouchableOpacity>;
        };
        this.renderHeader = (item) => {
            return <react_native_1.Text>{item.section.header}</react_native_1.Text>;
        };
        this.navigateToCrowd = (crowdKey, crowdName) => {
            this.props.navigation.navigate("CrowdChat", { key: crowdKey, crowdName,
                UUID: this.props.navigation.state.params.UUID });
        };
        this.state = {};
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
            title: "Crowds",
        },
    };
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    lowerText: {
        color: "white",
    },
    lowerView: {
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
    wrapper: {},
});
exports.default = Main;
//# sourceMappingURL=MainPage.js.map