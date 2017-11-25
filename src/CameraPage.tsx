import * as React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    DeviceEventEmitter,
    Platform,
} from 'react-native';

import Camera from 'react-native-camera';

interface Props {
    navigation: any;
}

interface State {
    camera: any;
}

class CameraPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.temp,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
        };
    }

    backButtonHandler: any;
    camera: any;
    // Hide the navigation bar
    static navigationOptions = {
        header: null
    };

    public returnUrl = (url) => {
        this.props.navigation.state.params.returnUrl(url);
    };

    // When the capture button is clicked
    takePicture = () => {
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                        this.props.navigation.navigate('PictureConfirm', {
                            path: data,
                            UUID: this.props.navigation.state.params.UUID,
                            returnUrl: this.returnUrl.bind(this),
                            key: this.props.navigation.state.key
                        });
                })
                .catch(err => console.error(err));
        }
    };

    // When the flashlight button is clicked
    switchFlash = () => {
        let newFlashMode;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    };

    // Determine which icon to get for flashlight
    get flashIcon() {
        let icon;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('../asset/flashAuto.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('../asset/flashOn.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('../asset/flashOff.png');
        }

        return icon;
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={styles.top}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            this.props.navigation.goBack(null);
                        }
                        }>
                        <Image
                            source={require('../asset/discard.png')}
                            style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={this.switchFlash}>
                        <Image
                            source={this.flashIcon}
                            style={styles.image}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={this.takePicture}>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 80,
    },
    backButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
    image: {
        height: 80,
        width: 80
    },
    top: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
    },
    bottom: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
    }
});

export default CameraPage;