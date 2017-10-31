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
const { width } = react_native_1.Dimensions.get('window');
const firebase = require("firebase");
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('users');
const crowdsRef = rootRef.child('crowds');
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.checkIfExist = () => {
            itemsRef.child("phipWang").once('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    alert('Welcome Back');
                }
                else {
                    this.props.navigation.navigate('NewUser');
                }
            });
        };
        this.clicked = () => {
            this.props.navigation.navigate('NewGroup');
        };
        // TODO: Add flatlist to display all the available groups
        this.getGroupInfo = () => {
            crowdsRef.on('value', (snapshot) => {
                console.log(snapshot.val());
            });
        };
        // listenForItems = ()  => {
        //     itemsRef.on('value', (snap) => {
        //         // get children as an array
        //         var items = [];
        //         snap.forEach((child) => {
        //             items.push({
        //                 title: child.val().title,
        //                 _key: child.key
        //             });
        //         });
        //
        //         this.setState({
        //             dataSource: this.state.dataSource.cloneWithRows(items)
        //         });
        //
        //     });
        // };
        this.navigateToCrowd = () => {
            this.props.navigation.navigate('CrowdChat');
        };
        this.state = {
            buttonClicked: false,
        };
    }
    componentDidMount() {
        this.checkIfExist();
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.Text>ssssssss</react_native_1.Text>
                <react_native_1.TouchableOpacity onPress={this.clicked}>
                    <react_native_1.Text>Add new group</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={this.getGroupInfo}>
                    <react_native_1.Text>Get Group Info</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={this.navigateToCrowd}>
                    <react_native_1.Text>Chat Test</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92AAD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        flex: 1
    },
    lowerView: {
        flex: 0.35,
        backgroundColor: '#FFCD00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerText: {
        color: 'white'
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    }
});
exports.default = Main;
//# sourceMappingURL=MainPage.js.map