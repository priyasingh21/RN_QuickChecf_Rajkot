import React, {Component} from 'react';
import {Alert, ImageBackground, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {colors, hp, wp} from '../../../Helper';
import NetInfo from '@react-native-community/netinfo';

class Splashscreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection_Status: "",
        }
    }

    componentDidMount() {
        this.handleScreenNavigation();

        NetInfo.addEventListener((state) => {
            if (!state.isConnected && this.state.connection_Status !== state.isConnected) {
                this.setState({
                    connection_Status: state.isConnected
                })
                Alert.alert('No Internet', 'Please try again later', [{text: 'OK'}])

            } else {
                this.setState({
                    connection_Status: state.isConnected
                })
            }
        });
    }

    handleScreenNavigation = () => {
        const {User} = this.props;
        const {user} = User;
        AsyncStorage.getItem('loginData').then(res => {
            if(res && JSON.parse(res).success) {
                let data = JSON.parse(res).data;
                if(data && data.length > 0 && data[0].id) {
                    AsyncStorage.getItem('setVerificationCode').then(response => {
                        if(response && JSON.parse(response) && JSON.parse(response).type === ('phone' || 'email') && JSON.parse(response).entered) {
                            this.props.navigation.navigate('AppDrawer');
                        } else if(response && JSON.parse(response) && JSON.parse(response).type === 'phone' && !JSON.parse(response).entered) {
                            this.props.navigation.navigate('Login');
                        } else {
                            this.props.navigation.navigate('Login');
                        }
                    })
                }
            } else {
                this.props.navigation.navigate('InitialScreen');
            }
        }).catch(e => {
        })
    }

    render() {
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
