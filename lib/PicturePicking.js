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
const react_native_camera_roll_picker_1 = require("react-native-camera-roll-picker");
const firebase = require("firebase");
const react_native_fetch_blob_1 = require("react-native-fetch-blob");
const react_native_elements_1 = require("react-native-elements");
let storageRef = firebase.storage().ref();
class PicturePicking extends React.Component {
    constructor(props) {
        super(props);
        this.addNewGroup = () => __awaiter(this, void 0, void 0, function* () {
            alert('Uploading');
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
            yield uploadImage(this.state.selected[0].uri);
            storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
                alert('success');
                this.props.navigation.state.params.returnUrl(url);
                this.props.navigation.goBack(null);
            }).catch(function (error) {
                alert(error);
            });
        });
        this.getSelectedImages = (images, current) => __awaiter(this, void 0, void 0, function* () {
            var num = images.length;
            this.setState({
                num: num,
                selected: images,
            });
            console.log(current);
            console.log(this.state.selected);
        });
        this.state = {
            num: 0,
            selected: [],
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ addNewGroup: this.addNewGroup.bind(this) });
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.content}>
                    <react_native_1.Text style={styles.text}>
                        <react_native_1.Text style={styles.bold}> {this.state.num} </react_native_1.Text> images has been selected
                    </react_native_1.Text>
                </react_native_1.View>
                <react_native_camera_roll_picker_1.default scrollRenderAheadDistance={500} initialListSize={1} pageSize={3} removeClippedSubviews={false} groupTypes='SavedPhotos' batchSize={5} maximum={1} selected={this.state.selected} assetType='Photos' imagesPerRow={3} imageMargin={5} callback={this.getSelectedImages.bind(this)}/>
            </react_native_1.View>);
    }
}
PicturePicking.navigationOptions = ({ navigation }) => {
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