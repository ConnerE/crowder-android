"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
const React = require("react");
const react_native_1 = require("react-native");
const react_native_elements_1 = require("react-native-elements");
var MapView = require('react-native-maps');
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const react_native_google_places_autocomplete_1 = require("react-native-google-places-autocomplete");
const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");
class NewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.submit = () => {
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
                members: { admin: { userID: this.props.navigation.state.params._id } }
            });
            this.props.navigation.goBack(null);
        };
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
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.ScrollView>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="search" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"What's your crowd name"} placeholderTextColor={"#003EFF"} onChangeText={(name) => this.setState({ name })} underlineColorAndroid="#003EFF"/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.iconText}>
                        <react_native_1.View style={{ marginTop: 20, flex: 0.08 }}>
                            <FontAwesome_1.default name="heart" size={20} color="#1d24ff"/>
                        </react_native_1.View>
                        <react_native_1.View style={{ flex: 0.92 }}>
                            <react_native_1.TextInput placeholder={"Describe the functionality of your crowd"} placeholderTextColor={"#003EFF"} onChangeText={(desc) => this.setState({ desc })} underlineColorAndroid="#003EFF"/>
                        </react_native_1.View>
                    </react_native_1.View>
                            <react_native_google_places_autocomplete_1.GooglePlacesAutocomplete placeholder="Enter Locations" placeholderTextColor={"#003EFF"} minLength={2} autoFocus={false} underlineColorAndroid="#003EFF" returnKeyType={"default"} fetchDetails={true} styles={{
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
        }} query={{
            key: "AIzaSyCxbfxGUV05x6_Z0qVFmVBB1vIR1063aow",
            language: "en",
        }} onPress={(data, details = null) => {
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
        }} currentLocation={true}/>
                    <react_native_1.View style={styles.mapView}>
                        <MapView style={{
            height: react_native_1.Dimensions.get('window').height * 0.4,
            width: react_native_1.Dimensions.get('window').width,
            margin: 0
        }} initialRegion={this.state.region} showsUserLocation={true} ref={ref => {
            this.map = ref;
        }}>
                            {this.state.lat !== 0 && <MapView.Marker coordinate={this.state.region} title={"Here is your group"}/>}
                        </MapView>
                    </react_native_1.View>
                    <react_native_1.View style={{ marginTop: 20, marginBottom: 20 }}>
                        <react_native_elements_1.Button small backgroundColor="#003EFF" onPress={this.submit} icon={{ name: 'envira', type: 'font-awesome' }} title='Submit'/>
                    </react_native_1.View>
                </react_native_1.ScrollView>
            </react_native_1.View>);
    }
}
NewGroup.navigationOptions = ({ navigation }) => {
    return {
        title: 'Creating New Crowd',
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    }
});
exports.default = NewGroup;
//# sourceMappingURL=NewGroup.js.map