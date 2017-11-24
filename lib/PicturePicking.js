"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_camera_roll_picker_1 = require("react-native-camera-roll-picker");
const firebase = require("firebase");
const react_native_fetch_blob_1 = require("react-native-fetch-blob");
let storageRef = firebase.storage().ref();
class PicturePicking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            selected: [],
        };
    }
    getSelectedImages(images, current) {
        var num = images.length;
        this.setState({
            num: num,
            selected: images,
        });
        var metadata = {
            contentType: 'image/jpeg',
        };
        const Blob = react_native_fetch_blob_1.default.polyfill.Blob;
        window.XMLHttpRequest = react_native_fetch_blob_1.default.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const uploadImage = (uri, mime = 'application/octet-stream') => {
            return new Promise((resolve, reject) => {
                const uploadUri = react_native_1.Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const sessionId = new Date().getTime();
                let uploadBlob = null;
                const imageRef = storageRef.child(`${sessionId}`);
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
        uploadImage(current.uri);
        console.log(current);
        console.log(this.state.selected);
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.content}>
                    <react_native_1.Text style={styles.text}>
                        <react_native_1.Text style={styles.bold}> {this.state.num} </react_native_1.Text> images has been selected
                    </react_native_1.Text>
                </react_native_1.View>
                <react_native_camera_roll_picker_1.default scrollRenderAheadDistance={500} initialListSize={1} pageSize={3} removeClippedSubviews={false} groupTypes='SavedPhotos' batchSize={5} maximum={3} selected={this.state.selected} assetType='Photos' imagesPerRow={3} imageMargin={5} callback={this.getSelectedImages.bind(this)}/>
            </react_native_1.View>);
    }
}
exports.default = PicturePicking;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6AE2D',
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#fff',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 12,
    },
});
//# sourceMappingURL=PicturePicking.js.map