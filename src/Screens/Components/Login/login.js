import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import { colors, hp, wp, boxShadow, fontSizes } from '../../../Helper';
import { AppButton, ProcessIndicator } from '../../Common';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state={
            isLoading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 2000)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
            if(this.props !== nextProps) {
                const {User} = nextProps;
                const {user} = User;
            }
        }

    onPhoneBtnClick = (type) => {
        this.props.navigation.navigate('SignInWithPhone', {type})
    }

    onGmailBtnClick = () => {
    }

    onRegisterClick = () => {
        this.props.navigation.navigate('Registration')
    }

    render() {
        const { buttonContainer } = styles;
        const {isLoading} = this.state;

        return(
            <View style={{flex: 1 }}>
                <ImageBackground
                    source={require('../../../../assets/splash.png')}
                    style={{
                        flex: 1,
                        paddingVertical: hp(10),
                        paddingHorizontal: hp(7),
                    }}>

                    <Text style={{
                        color: colors.WHITE,
                        fontWeight: 'bold',
                        fontSize: fontSizes.xlarge,
                    }}>
                        {"Welcome!\nNice to meet you again :)"}
                    </Text>

                    <View style={buttonContainer}>
                        <AppButton
                            onBtnPress={() => this.onPhoneBtnClick('phone')}
                            textColor={colors.WHITE}
                            backgroundColor={colors.LIMA}
                            iconTitle={'md-call'}
                            iconColor={colors.WHITE}
                            buttonText={'Sign in with Phone'}
                        />

                        <AppButton
                            onBtnPress={() => this.onPhoneBtnClick('email')}
                            textColor={colors.WHITE}
                            backgroundColor={colors.SKYBLUE}
                            iconTitle={'md-mail'}
                            iconColor={colors.WHITE}
                            buttonText={'Sign in with Email'}
                        />

                        <AppButton
                            onBtnPress={this.onGmailBtnClick}
                            textColor={colors.BLACK}
                            backgroundColor={colors.WHITE}
                            isImage={true}
                            iconColor={colors.RED}
                            buttonText={'Sign in with Google'}
                            titleText={{fontSize: fontSizes.small}}
                        />

                        <AppButton
                            textColor={colors.WHITE}
                            backgroundColor={colors.MARINER}
                            titleText={{fontSize: fontSizes.small}}
                            iconTitle={'logo-facebook'}
                            iconColor={colors.WHITE}
                            buttonText={'Sign in with Facebook'}
                        />
                    </View>

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

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: wp(45),
        backgroundColor: colors.TRANSPARENT,
        alignItems: 'center'
    }
});

export { Login }
