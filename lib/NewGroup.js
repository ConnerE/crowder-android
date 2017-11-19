"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
//
//
//
//
const React = require("react");
const react_native_1 = require("react-native");
const { width } = react_native_1.Dimensions.get("window");
const firebase = require("firebase");
const react_native_google_places_autocomplete_1 = require("react-native-google-places-autocomplete");
const rootRef = firebase.database().ref();
const crowdsRef = rootRef.child("crowds");
class NewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.submit = () => {
            crowdsRef.push({
                name: this.state.name,
                desc: this.state.desc,
                lat: this.state.lat,
                lng: this.state.lng,
                members: this.props.navigation.state.params._id
            });
            this.props.navigation.goBack(null);
        };
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.TextInput placeholder={"Name"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(name) => this.setState({ name })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"Desc"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(desc) => this.setState({ desc })} underlineColorAndroid="rgba(0,0,0,0)"/>

                <react_native_google_places_autocomplete_1.GooglePlacesAutocomplete placeholder="Enter Location" minLength={2} autoFocus={false} returnKeyType={"default"} fetchDetails={true} styles={{
            predefinedPlacesDescription: {
                color: "#1faadb",
            },
            textInput: {
                color: "#5d5d5d",
                fontSize: 16,
                height: 38,
                marginLeft: 0,
                marginRight: 0,
            },
            textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                borderBottomWidth: 0,
                borderTopWidth: 0,
            },
        }} query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCxbfxGUV05x6_Z0qVFmVBB1vIR1063aow",
            language: "en",
        }} onPress={(data, details = null) => {
            this.setState({
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
            });
        }} currentLocation={true}/>

                <react_native_1.View style={styles.submitView}>
                    <react_native_1.TouchableOpacity onPress={this.submit}>
                        <react_native_1.Text>Submit</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>

            </react_native_1.View>);
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
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
});
exports.default = NewGroup;
//# sourceMappingURL=NewGroup.js.map