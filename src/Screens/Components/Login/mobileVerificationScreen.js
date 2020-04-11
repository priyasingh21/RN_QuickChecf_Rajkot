import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { colors, hp, wp, fontSizes } from '../../../Helper';
import { SmallAppButton, ProcessIndicator, CustomAlert } from '../../Common';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MobileVerificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            word1: '',
            word2: '',
            word3: '',
            word4: '',
            word5: '',
            word6: '',
            minutes: 0,
            seconds: 59,
            isResendClick: false,
            mobileNumber: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.mobileNumber && props.navigation.state.params.mobileNumber,
            verificationCodeResponse: '',
            isShowError: false
        }
    }

    UNSAFE_componentWillMount() {
        const { User } = this.props;
        if (User && User.user && User.user.data && User.user.data.length > 0) {
            if (User.user.data[0].verification_code) {
                this.setState({
                    verificationCodeResponse: User.user.data[0].verification_code
                })
            }
        }
    }

    componentDidMount() {
        const { isResendClick } = this.state;

        if (!isResendClick) {
            this.startTimer()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { verificationCodeResponse } = this.state;
        const { User } = nextProps;
        if (this.props !== nextProps) {
            if (User && User.user && User.user.data && User.user.data.length > 0) {
                if (User.user.data[0].verification_code !== verificationCodeResponse) {
                    this.setState({
                        verificationCodeResponse: User.user.data[0].verification_code
                    })
                }
            }
        }
    }

    startTimer = () => {
        const { minutes, seconds } = this.state;
        let mm = minutes;
        let ss = seconds
        this.countDown = setInterval(() => {

            if (ss === 0) {
                ss = 59;
                mm -= 1;
            }

            if (ss <= 59) {
                ss -= 1
            }

            if (mm < 0) {
                mm = 0;
                ss = 0;
            }

            if (mm === 0 && ss === 0) {
                clearInterval(this.countDown)
                this.setState({
                    isResendClick: true
                })
            }

            this.setState({
                minutes: mm,
                seconds: ss,
            })
        }, 1000)
    }

    onContinue = () => {
        const { word1, word2, word3, word4, word5, word6, verificationCodeResponse } = this.state;

        let verification_code = ((((word1.concat(word2)).concat(word3)).concat(word4)).concat(word5)).concat(word6);

        if (verification_code === '') {
            this.updateText('Please enter verification code sent to your phone', 'error');
            this.setState({ isShowError: true })
            return
        }
        if (verification_code.length < 6) {
            this.updateText('verification code should contain only 6 digits', 'error')
            return
        }
        this.updateText('', 'error');

        if (verification_code && verification_code.length === 6 && verificationCodeResponse && (verificationCodeResponse.toString() === verification_code)) {
            AsyncStorage.setItem('setVerificationCode', JSON.stringify({ type: 'phone', entered: true }), () => {
                AsyncStorage.getItem('loginData').then(res => {
                    if(res && JSON.parse(res).data[0]) {
                        this.props.navigation.navigate('AppDrawer');
                    }
                }).catch(e => {

                })})
        } else {
            this.updateText('Whooops,\nEntered code is wrong, Please try again...', 'error')
            this.setState({ isShowError: true })
        }
    };

    updateText = (val, key) => {
        this.setState({
            [key]: val
        })
    };

    onTextChanged = (key, val, focusTextInput) => {
        this.setState({
            [key]: val
        }, () => {
            (val && val.length === 1) && focusTextInput.focus();
        })
    };

    onResendCode = () => {
        const { handleLocalAction, localActions } = this.props;
        const { mobileNumber } = this.state;
        handleLocalAction({ type: localActions.LOGIN_CHEF, data: { username: mobileNumber, type: 'phone' } })

        this.setState({
            isResendClick: false,
            minutes: 0,
            seconds: 59,
        }, () => {
            this.startTimer();
        })
    }

    handleAlertOk = () => {
        const { isShowError } = this.state;
        this.setState({
            isShowError: !isShowError
        })
    }

    render() {
        const { error, minutes, seconds, isResendClick, word1, word2, word3, word4, word5, word6, isShowError } = this.state;
        let mm = (minutes < 10) ? (`0${minutes}`) : minutes
        let ss = (seconds < 10) ? (`0${seconds}`) : seconds
        const { User } = this.props;
        const { processing } = User;

        return (
            <View style={{ flex: 1 }}>
                <ProcessIndicator color={colors.WHITE} isProcessing={processing} />
                <ImageBackground
                    source={require('../../../../assets/splash.png')}
                    style={{
                        flex: 1,
                        paddingVertical: hp(6),
                        paddingHorizontal: hp(3),
                    }}>
                    <View style={{ marginTop: hp(6) }}>
                        <Text style={{
                            fontSize: fontSizes.xxxlarge,
                            color: colors.WHITE,
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>{'Verification'}</Text>
                    </View>

                    <View style={{ marginTop: hp(6) }}>
                        <Text style={{
                            fontSize: fontSizes.xxmedium,
                            color: colors.WHITE,
                            fontWeight: 'bold',
                            alignSelf: 'flex-start'
                        }}>{'Now, check your E-mail for Email\nverification'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: wp(3)
                    }}>
                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text1 = ref}
                                maxLength={1}
                                value={word1}
                                keyboardType={'numeric'}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text1.focus()
                                    }
                                }}
                                onChangeText={(word1) => this.onTextChanged('word1', word1, this.text2)}
                            />
                        </View>

                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text2 = ref}
                                maxLength={1}
                                keyboardType={'numeric'}
                                value={word2}
                                onChangeText={(word2) => this.onTextChanged('word2', word2, this.text3)}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text1.focus()
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text3 = ref}
                                maxLength={1}
                                keyboardType={'numeric'}
                                value={word3}
                                onChangeText={(word3) => this.onTextChanged('word3', word3, this.text4)}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text2.focus()
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text4 = ref}
                                maxLength={1}
                                keyboardType={'numeric'}
                                value={word4}
                                onChangeText={(word4) => this.onTextChanged('word4', word4, this.text5)}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text3.focus()
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text5 = ref}
                                maxLength={1}
                                keyboardType={'numeric'}
                                value={word5}
                                onChangeText={(word5) => this.onTextChanged('word5', word5, this.text6)}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text4.focus()
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            height: hp(6),
                            width: hp(6),
                            marginHorizontal: wp(2),
                            backgroundColor: colors.WHITE
                        }}>
                            <TextInput
                                ref={(ref) => this.text6 = ref}
                                maxLength={1}
                                keyboardType={'numeric'}
                                value={word6}
                                onChangeText={(word6) => this.onTextChanged('word6', word6, this.text6)}
                                style={[{
                                    marginLeft: 0,
                                    textAlign: 'center',
                                    color: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%'
                                }]}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        this.text5.focus()
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: hp(3) }}>
                        <Text style={{
                            fontSize: fontSizes.xxmedium,
                            color: colors.WHITE,
                            fontWeight: 'bold',
                            alignSelf: 'flex-end'
                        }}>{"Didn't receive the code?"}</Text>
                    </View>

                    {
                        (isResendClick) &&
                        <TouchableOpacity
                            onPress={this.onResendCode}
                            style={{ marginTop: hp(1) }}>
                            <Text style={{
                                fontSize: fontSizes.xxmedium,
                                color: colors.SOILTEXTCOLOR,
                                fontWeight: 'bold',
                                alignSelf: 'flex-end'
                            }}>{"Resend Code"}</Text>
                        </TouchableOpacity>

                        ||

                        <View
                            style={{ marginTop: hp(1) }}>
                            <Text style={{
                                fontSize: fontSizes.xxmedium,
                                color: colors.GRAY,
                                fontWeight: 'bold',
                                alignSelf: 'flex-end'
                            }}>{"Resend Code"}</Text>
                        </View>
                    }

                    <View style={{ marginTop: hp(1) }}>
                        <Text style={{
                            fontSize: fontSizes.xxmedium,
                            color: colors.SOILTEXTCOLOR,
                            fontWeight: 'bold',
                            alignSelf: 'flex-end'
                        }}>{mm + " : " + ss}</Text>
                    </View>

                    <SmallAppButton
                        onPress={this.onContinue}
                        btnTitle={'Continue'}
                        btnStyle={{ width: hp(20) }}
                    />
                </ImageBackground>
                {(isShowError) &&
                    <CustomAlert
                        title={'Error'}
                        message={error}
                        buttonTitle={'Ok'}
                        handleAlertButtonClick={this.handleAlertOk}
                    />}
            </View>
        )
    }
}
export { MobileVerificationScreen }



