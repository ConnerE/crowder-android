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
import { Icon, SocialIcon } from "react-native-elements";

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

    public static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            headerLeft: null,
            headerRight: <Icon name="add" color="#000000" size={35}
                               onPress={() => {
                                   if (navigation.state.params.addNewGroup !== undefined) {
                                       navigation.state.params.addNewGroup();
                                   }
                               }}/>,
            headerStyle: {
                marginTop: (Platform.OS === "ios") ? -20 : 0,
            },
            title: "Crowds",

        };
    };

    componentDidMount() {
        this.props.navigation.setParams({addNewGroup: this.addNewGroup.bind(this)});
    }

    addNewGroup = async () => {
        alert('Uploading');
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

        await uploadImage(this.state.selected[0].uri);
        storageRef.child(this.props.navigation.state.params.UUID + '.jpg').getDownloadURL().then((url) => {
            alert('success');
            this.props.navigation.state.params.returnUrl(url);
            this.props.navigation.goBack(null);
        }).catch(function(error) {
            alert(error);
        });
    };

    getSelectedImages = async (images, current) => {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        console.log(current);
        console.log(this.state.selected);
    };

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
                    maximum={1}
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

