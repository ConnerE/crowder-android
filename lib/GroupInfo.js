"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
const React = require("react");
const react_native_1 = require("react-native");
var MapView = require('react-native-maps');
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");
class GroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getGroupInfo = () => {
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
            });
        };
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
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.StatusBar hidden={true}/>
                    <react_native_1.View style={styles.mapView}>
                        <MapView style={{
            height: react_native_1.Dimensions.get('window').height,
            width: react_native_1.Dimensions.get('window').width,
            margin: 0
        }} initialRegion={this.state.region} showsUserLocation={true} ref={ref => {
            this.map = ref;
        }}>
                            {this.state.name !== "" && <MapView.Marker coordinate={this.state.region} title={this.state.name} description={this.state.desc}/>}
                        </MapView>
                    </react_native_1.View>
            </react_native_1.View>);
    }
}
GroupInfo.navigationOptions = ({ navigation }) => {
    return {
        title: 'Crowd Information',
        headerTintColor: "#FFFFFF",
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: "#003EFF",
            marginTop: (react_native_1.Platform.OS === 'ios') ? -20 : 0,
        },
    };
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = GroupInfo;
//# sourceMappingURL=GroupInfo.js.map