import * as React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageStore,
    ImageEditor,
    Platform,
    DeviceEventEmitter,
    BackHandler
} from 'react-native';

import * as firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob'
let storageRef = firebase.storage().ref();

interface Props {
    navigation: any;
}

interface State {
    buttonClicked: boolean;
}

class PictureConfirm extends React.Component<Props, State> {
    constructor(props) {
        super(props);

    }

    // Hide the navigation bar for every page
    static navigationOptions = {
        header: null
    };

    // When the accept button is clicked, this creates an object to be sent to webview
    submitClicked = async () => {
        alert('Please Wait');
        let imageURL = this.props.navigation.state.params.path['path'];
        const Blob = RNFetchBlob.polyfill.Blob;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        const uploadImage = (uri, mime = 'application/octet-stream') => {
            return new Promise((resolve, reject) => {
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                let uploadBlob = null;
                const imageRef = storageRef.child(this.props.navigation.state.params.UUID + '.jpg');

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

        await uploadImage(imageURL);
        storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
            alert('success');
            this.props.navigation.state.params.returnUrl(url);
            this.props.navigation.goBack(this.props.navigation.state.params.key);
        }).catch(function(error) {
            alert(error);
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    resizeMode="cover"
                    source={{uri: this.props.navigation.state.params.path['path']}}/>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => {
                                this.props.navigation.goBack(null);
                        }}
                        style={styles.button}>
                        <Image
                            source={require('../asset/discard.png')}
                            style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.submitClicked.bind(this)}
                        style={styles.button}>
                        <Image
                            source={require('../asset/accept.png')}
                            style={styles.image}/>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
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

export default PictureConfirm;