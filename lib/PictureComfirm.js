"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const firebase = require("firebase");
const react_native_fetch_blob_1 = require("react-native-fetch-blob");
let storageRef = firebase.storage().ref();
class PictureConfirm extends React.Component {
    constructor(props) {
        super(props);
        // When the accept button is clicked, this creates an object to be sent to webview
        this.submitClicked = () => __awaiter(this, void 0, void 0, function* () {
            alert('Please Wait');
            let imageURL = this.props.navigation.state.params.path['path'];
            const Blob = react_native_fetch_blob_1.default.polyfill.Blob;
            window.XMLHttpRequest = react_native_fetch_blob_1.default.polyfill.XMLHttpRequest;
            window.Blob = Blob;
            const uploadImage = (uri, mime = 'application/octet-stream') => {
                return new Promise((resolve, reject) => {
                    const uploadUri = react_native_1.Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                    let uploadBlob = null;
                    const imageRef = storageRef.child(this.props.navigation.state.params.UUID + '.jpg');
                    react_native_fetch_blob_1.default.fs.readFile(uploadUri, 'base64')
                        .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` });
                    })
                        .then((blob) => {
                        uploadBlob = blob;
                        return imageRef.put(blob, { contentType: mime });
                    })
                        .then(() => {
                        uploadBlob.close();
                        return imageRef.getDownloadURL();
                    })
                        .then((url) => {
                        resolve(url);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                });
            };
            yield uploadImage(imageURL);
            storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
                alert('success');
                this.props.navigation.state.params.returnUrl(url);
                this.props.navigation.goBack(this.props.navigation.state.params.key);
            }).catch(function (error) {
                alert(error);
            });
        });
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.Image style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }} resizeMode="cover" source={{ uri: this.props.navigation.state.params.path['path'] }}/>
                <react_native_1.View style={styles.buttonView}>
                    <react_native_1.TouchableOpacity onPress={() => {
            this.props.navigation.goBack(null);
        }} style={styles.button}>
                        <react_native_1.Image source={require('../asset/discard.png')} style={styles.image}/>
                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity onPress={this.submitClicked.bind(this)} style={styles.button}>
                        <react_native_1.Image source={require('../asset/accept.png')} style={styles.image}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            </react_native_1.View>);
    }
}
// Hide the navigation bar for every page
PictureConfirm.navigationOptions = {
    header: null
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    button: {
        borderRadius: 15,
        paddingHorizontal: 60,
    },
    buttonView: {
        flexDirection: 'row',
        position: 'absolute',
        paddingBottom: 30,
    },
    image: {
        height: 100,
        width: 100
    }
});
exports.default = PictureConfirm;
//# sourceMappingURL=PictureComfirm.js.map