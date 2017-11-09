"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: Chance the databse schema to include: creator, current members, lat, long, and radius
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
            // crowdsRef.push({
            //     name: this.state.name,
            //     desc: this.state.desc
            // });
            //
            // this.props.navigation.goBack(null);
        };
    }
    componentDidMount() {
    }
    render() {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_1.StatusBar hidden={true}/>
                <react_native_1.TextInput placeholder={"Name"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(name) => this.setState({ name })} underlineColorAndroid="rgba(0,0,0,0)"/>
                <react_native_1.TextInput placeholder={"Desc"} placeholderTextColor={"rgba(255,255,255,0.8)"} onChangeText={(desc) => this.setState({ desc })} underlineColorAndroid="rgba(0,0,0,0)"/>

                <react_native_google_places_autocomplete_1.GooglePlacesAutocomplete placeholder="Enter Location" minLength={2} autoFocus={false} returnKeyType={"default"} fetchDetails={true} styles={{
            textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                borderTopWidth: 0,
                borderBottomWidth: 0,
            },
            textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
            },
            predefinedPlacesDescription: {
                color: "#1faadb",
            },
        }} query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCxbfxGUV05x6_Z0qVFmVBB1vIR1063aow",
            language: "en",
        }} onPress={(data, details = null) => {
            console.log(details.geometry.location);
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
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB",
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5",
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9",
    },
    slide4: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92AAD9",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    image: {
        flex: 1,
    },
    lowerView: {
        flex: 0.35,
        backgroundColor: "#FFCD00",
        alignItems: "center",
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
exports.default = NewGroup;
//# sourceMappingURL=NewGroup.js.map