import * as React from "react";
import {
    BackHandler,
    DeviceEventEmitter,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageStore
} from "react-native";

import CameraRollPicker from 'react-native-camera-roll-picker';
import * as firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob'
let storageRef = firebase.storage().ref();
interface IProps {
    navigation: any;
}

interface IState {
    num: number,
    selected: any
}


export default class PicturePicking extends React.Component<IProps, IState> {
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

        const Blob = RNFetchBlob.polyfill.Blob;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        const uploadImage = (uri, mime = 'application/octet-stream') => {
            return new Promise((resolve, reject) => {
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
                const sessionId = new Date().getTime();
                let uploadBlob = null
                const imageRef = storageRef.child(`${sessionId}`);

                RNFetchBlob.fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                        uploadBlob.close()
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        };

        uploadImage(current.uri);

        console.log(current);
        console.log(this.state.selected);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}> {this.state.num} </Text> images has been selected
                    </Text>
                </View>
                <CameraRollPicker
                    scrollRenderAheadDistance={500}
                    initialListSize={1}
                    pageSize={3}
                    removeClippedSubviews={false}
                    groupTypes='SavedPhotos'
                    batchSize={5}
                    maximum={3}
                    selected={this.state.selected}
                    assetType='Photos'
                    imagesPerRow={3}
                    imageMargin={5}
                    callback={this.getSelectedImages.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

