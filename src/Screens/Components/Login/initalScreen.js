import React, { Component } from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { colors, hp, wp, fontSizes, boxShadow } from '../../../Helper';
import NetInfo from '@react-native-community/netinfo';
import { SmallAppButton, ProcessIndicator } from '../../Common';

class InitialScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection_Status: "",
        }
    }

    componentDidMount() {

        NetInfo.addEventListener('connectionChange', this.handlspeConnectivityChange)

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

    handleConnectivityChange = (isConnected) => {
        if (isConnected == true) {
            this.setState({ connection_Status: "Online" })
        } else {
            this.setState({ connection_Status: "Offline" }, () => {
                alert('You have lost connection. Please connect you device.')
            })
        }
    };

    onSignInClick = () => {
        const {navigation} = this.props;
        navigation.navigate('Login');
    }

    onRegisterClick = () => {
        this.props.navigation.navigate('Registration')
    }

    render() {

        return(
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../../../../assets/splash.png')}
                    style={{
                        flex: 1,
                        paddingVertical: hp(20),
                        paddingHorizontal: hp(7),
                        justifyContent: 'flex-end'
                    }}>
                    <SmallAppButton btnStyle={{width: wp(65)}} onPress={this.onSignInClick} btnTitle={'Log In'}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            color: colors.WHITE,
                            fontWeight: 'bold',
                            fontSize: fontSizes.large,
                            alignSelf: 'center',
                            marginVertical: wp(2)
                        }}>
                            {"Don't Have an Account? Register "}
                        </Text>

                        <TouchableOpacity onPress={this.onRegisterClick}>
                            <Text style={{
                                color: colors.APPGREEN,
                                fontWeight: 'bold',
                                fontSize: fontSizes.large,
                                alignSelf: 'center',
                                marginVertical: wp(2)
                            }}>
                                {"Here"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: wp(1),
                        width: wp(35),
                        backgroundColor: colors.WHITE,
                        borderRadius: wp(5),
                        position: 'absolute',
                        bottom: hp(2),
                        alignSelf: 'center'
                    }} />
                </ImageBackground>
            </View>
        )
    }
}

export { InitialScreen }
