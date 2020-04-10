import React, { Component } from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { colors, hp, wp, fontSizes } from '../../../Helper';
import { SmallAppButton } from '../../Common';
import Icon from 'react-native-vector-icons/AntDesign';

class InitialScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection_Status: "",
        }
    }

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
                </ImageBackground>
            </View>
        )
    }
}

export { InitialScreen }
