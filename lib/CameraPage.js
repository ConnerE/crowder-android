"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_camera_1 = require("react-native-camera");
class CameraPage extends React.Component {
    constructor(props) {
        super(props);
        this.returnUrl = (url) => {
            this.props.navigation.state.params.returnUrl(url);
        };
        // When the capture button is clicked
        this.takePicture = () => {
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
        this.switchFlash = () => {
            let newFlashMode;
            const { auto, on, off } = react_native_camera_1.default.constants.FlashMode;
            if (this.state.camera.flashMode === auto) {
                newFlashMode = on;
            }
            else if (this.state.camera.flashMode === on) {
                newFlashMode = off;
            }
            else if (this.state.camera.flashMode === off) {
                newFlashMode = auto;
            }
            this.setState({
                camera: Object.assign({}, this.state.camera, { flashMode: newFlashMode }),
            });
        };
        this.camera = null;
        this.state = {
            camera: {
                aspect: react_native_camera_1.default.constants.Aspect.fill,
                captureTarget: react_native_camera_1.default.constants.CaptureTarget.temp,
                orientation: react_native_camera_1.default.constants.Orientation.auto,
                flashMode: react_native_camera_1.default.constants.FlashMode.auto,
            },
        };
    }
    // Determine which icon to get for flashlight
    get flashIcon() {
        let icon;
        const { auto, on, off } = react_native_camera_1.default.constants.FlashMode;
        if (this.state.camera.flashMode === auto) {
            icon = require('../asset/flashAuto.png');
        }
        else if (this.state.camera.flashMode === on) {
            icon = require('../asset/flashOn.png');
        }
        else if (this.state.camera.flashMode === off) {
            icon = require('../asset/flashOff.png');
        }
        return icon;
    }
    render() {
        return (<react_native_1.View style={styles.container}>
                <react_native_camera_1.default ref={(cam) => {
            this.camera = cam;
        }} style={styles.preview} aspect={this.state.camera.aspect} captureTarget={this.state.camera.captureTarget} type={this.state.camera.type} flashMode={this.state.camera.flashMode} defaultTouchToFocus mirrorImage={false}/>
                <react_native_1.View style={styles.top}>
                    <react_native_1.TouchableOpacity style={styles.backButton} onPress={() => {
            this.props.navigation.goBack(null);
        }}>
                        <react_native_1.Image source={require('../asset/discard.png')} style={styles.image}/>
                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
                        <react_native_1.Image source={this.flashIcon} style={styles.image}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
                <react_native_1.View style={styles.bottom}>
                    <react_native_1.TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                    </react_native_1.TouchableOpacity>

                </react_native_1.View>
            </react_native_1.View>);
    }
}
// Hide the navigation bar
CameraPage.navigationOptions = {
    header: null
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = CameraPage;
//# sourceMappingURL=CameraPage.js.map