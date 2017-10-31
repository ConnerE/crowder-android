/* This is the login page for choosing the probes
 * Algo: The system will check whether the user has a preferred probe, if yes, scan the devices around, and if that
 * probe exists, connect to the probe automatically. After 10 seconds, the user will be about to choose other available
 * probes around, and the preferred probed will be changed automatically
 *
 * TODO: Catch all the errors / Get rid of all the weird warnings
 * TODO: Add color to the buttons next to the English description
 * by: Philip Wang
 * on: June 15th, 2017
 */

import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    BackHandler,
    StatusBar,
    Dimensions
} from 'react-native';

import * as Swiper from 'react-native-swiper';
import { SocialIcon } from 'react-native-elements'
const {width} = Dimensions.get('window');
import * as firebase from 'firebase';


interface Props {
    navigation: any;
}

interface State {

}

const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('users');
const crowdsRef = rootRef.child('crowds');

class Main extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            buttonClicked: false,
        };
    }

    componentDidMount() {
        this.checkIfExist();
    }

    checkIfExist = () => {
        itemsRef.child("phipWang").once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                alert('Welcome Back');
            } else {
                this.props.navigation.navigate('NewUser');
            }
        });
    };

    clicked = () => {
        this.props.navigation.navigate('NewGroup');
    };

    // TODO: Add flatlist to display all the available groups
    getGroupInfo = () => {
        crowdsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        });
    };
    // listenForItems = ()  => {
    //     itemsRef.on('value', (snap) => {
    //         // get children as an array
    //         var items = [];
    //         snap.forEach((child) => {
    //             items.push({
    //                 title: child.val().title,
    //                 _key: child.key
    //             });
    //         });
    //
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(items)
    //         });
    //
    //     });
    // };
    navigateToCrowd = () => {
        this.props.navigation.navigate('CrowdChat');
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Text>ssssssss</Text>
                <TouchableOpacity onPress={this.clicked}>
                    <Text>Add new group</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.getGroupInfo}>
                    <Text>Get Group Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToCrowd}>
                    <Text>Chat Test</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {

    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92AAD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1
    },
    lowerView : {
        flex: 0.35,
        backgroundColor: '#FFCD00',
        alignItems: 'center',
        justifyContent: 'center',

    },
    lowerText: {
        color: 'white'
    },
    textView: {
        marginLeft: 40,
        marginRight: 40,
    }

});

export default Main;