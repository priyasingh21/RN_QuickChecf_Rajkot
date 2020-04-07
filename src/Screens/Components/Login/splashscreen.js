import React, { Component } from 'react';
import { View, ImageBackground, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { colors, hp, wp, fontSizes, boxShadow } from '../../../Helper';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class Splashscreen extends Component {

    constructor() {
        super();
        this.state = {
            connection_Status: "",
            errorMessage: "",
            location: null,
        }
    }

    UNSAFE_componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }

        AsyncStorage.getItem('loginData').then(res => {
            if (res && JSON.parse(res).id) {
                AsyncStorage.getItem('setVerificationCode').then(result => {
                    if (JSON.parse(result).type === 'email') {
                        this.props.navigation.navigate('AppDrawer');
                    } else if (JSON.parse(result).type === 'phone' && JSON.parse(result).entered === true) {
                        this.props.navigation.navigate('AppDrawer');
                    } else {
                        this.props.navigation.navigate('InitialScreen');

                    }

                }).catch(error => {

                })
            } else {
                this.props.navigation.navigate('InitialScreen');
            }
        }).catch(e => {
        })
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected == true) {
                this.setState({ connection_Status: "Online" })
            }
            else {
                this.setState({ connection_Status: "Offline" }, () => {
                    alert('You have lost connection. Please connect you device.')
                })
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    _getLocationAsync = () => {
        Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }
        });


        Location.getCurrentPositionAsync({}).then(({ location }) => {
            if (location !== null) {
                this.setState({ location }, () => {
                    AsyncStorage.setItem('deviceLocation', JSON.stringify(location))
                });
            }
        });
    };

    handleConnectivityChange = (isConnected) => {
        if (isConnected == true) {
            // this.setState({ connection_Status: "Online" })
        }
        else {
            alert('You have lost connection. Please connect you device.')
            // this.setState({ connection_Status: "Offline" }, () => {
            //     alert('You have lost connection. Please connect you device.')
            // })
        }
    };

    render() {

        const { location, errorMessage } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../../assets/splash.png')}
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {/* <View style={{
                        height: hp(12),
                        width: hp(40),
                        padding: wp(2)
                    }}>
                        <Image source={require('../../../../assets/QKLogo.jpeg')} style={{ height: '100%', width: '100%', }} />
                    </View> */}

                    <View style={{
                        height: wp(1),
                        width: wp(35),
                        backgroundColor: colors.WHITE,
                        borderRadius: wp(5),
                        position: 'absolute',
                        bottom: hp(2)
                    }} />
                </ImageBackground>
            </View>
        )
    }
}

export { Splashscreen }
