import React, { Component } from 'react';
import { View, Text, TextInput, Image, ImageBackground, AsyncStorage, Keyboard } from 'react-native';
import { colors, hp, wp, fontSizes, boxShadow } from '../../../Helper';
import { SmallAppButton, DropDownMenu, CustomTextInput, Banner, CustomAlert, ProcessIndicator } from '../../Common';

class SignInWithPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBanner: false,
            isLoading: false,
            phoneNumber: '',
            email: '',
            password: '',
            error: '',
            selectedCountry: '',
            country_code_Arr: [],
            type: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.type && props.navigation.state.params.type || 'phone',
            isCustomAlertShow: false,
            isFirstTime: true
        }
    }

    componentDidMount() {
        const { handleLocalAction, localActions } = this.props;
        handleLocalAction({ type: localActions.GET_COUNTRY_LIST })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { User } = nextProps;
        const { user, countries } = User;
        const { type, country_code_Arr } = this.state;
        let newType = nextProps.navigation.state.params.type;

        if(this.props !== nextProps) {

            if (countries && countries.success && countries.data && countries.data.length > 0 && country_code_Arr !== countries.data) {
                this.setState({
                    country_code_Arr: countries.data
                })
            }

            if (newType !== type) {
                this.setState({ type: newType })
            }
            if(this.props && user && this.props !== user) {
                let newUser = user.success
                if (!newUser) {
                    let error = user.message;
                    if(error) {
                        this.setState({
                            showBanner: true,
                            error,
                        }, () => {
                            this.hideBanner()
                        })
                    }
                } else {
                    if(newType === 'phone') {
                        this.props.navigation.navigate('MobileVerificationScreen')
                    } else {
                        this.props.navigation.navigate('AppDrawer')
                    }
                }
            }
        }
    }

    onContinueClick = () => {
        const { phoneNumber, type, email, password } = this.state;
        const { handleLocalAction, localActions, navigation } = this.props;

        this.setState({
            isLoading: true,
            isFirstTime: false,
            error: '',
            showBanner: false
        })

        if (type === 'phone') {
            if (phoneNumber === '') {
                this.updateText('Please enter mobile number', 'error');
                this.setState({ showBanner: true })
                this.hideBanner()
                return
            }
            if (phoneNumber.length > 10) {
                this.updateText('mobile number should contain only 10 digits', 'error')
                this.setState({ showBanner: true })
                this.hideBanner()
                return
            }
            this.updateText('', 'error');
            AsyncStorage.setItem('setVerificationCode', JSON.stringify({type: 'phone', entered: false}), () => {
                handleLocalAction({ type: localActions.LOGIN_CHEF, data: { username: phoneNumber, type } })
            })
        } else {
            if (email !== '' && password !== '') {
                AsyncStorage.setItem('setVerificationCode', JSON.stringify({type: 'email', entered: true}), () => {
                    handleLocalAction({ type: localActions.LOGIN_CHEF, data: { username: email, password, type } })
                })
            } else {
                this.updateText('Enter Email And Password', 'error');
                this.setState({ showBanner: true, isFirstTime: false })
                this.hideBanner()
            }
        }
    }

    updateText = (val, key) => {
        this.setState({
            [key]: val
        })
    }

    hideBanner = () => {
        setTimeout(() => {
            this.setState({
                showBanner: false,
                isLoading: false ,
                isFirstTime: true,
                error: '',
                phoneNumber: '',
                email: '',
                password: ''
            })
        }, 5000)
    }

    handleAlertOk = () => {
        const { isCustomAlertShow } = this.state;
        this.setState({
            isCustomAlertShow: !isCustomAlertShow
        })
    }

    render() {
        const { error, phoneNumber, type, isLoading, showBanner, country_code_Arr, isFirstTime } = this.state;
        let allCountryData = country_code_Arr.length > 0 && country_code_Arr.map(i => i.country_code);
        let country_list = allCountryData.length > 0 && allCountryData.filter((item, i, ar) => ar.indexOf(item) === i);

        let safeArea = {
            top: 20
        }

        return (
            <View style={{ flex: 1 }}>
                <ProcessIndicator color={colors.WHITE} isProcessing={isLoading} />
                <ImageBackground
                    source={require('../../../../assets/splash.png')}
                    style={{
                        flex: 1,
                        paddingVertical: hp(10),
                        paddingHorizontal: hp(7),
                    }}>
                    {
                        (showBanner && error !== '' && !isFirstTime) && <Banner title={''} showBanner={showBanner} message={error} safeArea={safeArea} isError={true} />
                    }
                    <Text style={{
                        color: colors.WHITE,
                        fontWeight: 'bold',
                        fontSize: fontSizes.xxmedium,
                        marginTop: wp(6),
                        alignSelf: 'center'
                    }}>
                        {(type === 'phone') ? 'Sign In with mobile number' : 'Sign In with Email'}
                    </Text>
                    {
                        (type === 'phone') &&
                        <View style={{
                            flexDirection: 'row',
                            padding: wp(3),
                            height: hp(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: hp(5),
                            borderRadius: wp(3),
                        }}>
                            <View style={{
                                padding: wp(3),
                                height: hp(8),
                                flex: 1.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    height: wp(15),
                                    width: wp(10),
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: wp(3),
                                    borderBottomLeftRadius: wp(3),
                                }}>
                                    <Image
                                        source={require('../../../../assets/flag_of_India.png')}
                                        style={{ height: wp(6), width: wp(6) }}
                                    />
                                </View>

                                <DropDownMenu
                                    style={{
                                        height: hp(8),
                                        width: hp(6),
                                        marginRight: wp(1),
                                        alignItems: 'center',
                                    }}
                                    bgColor={colors.WHITE}
                                    tintColor={'#666666'}
                                    activityTintColor={'green'}
                                    handler={(selection, row) => this.setState({ selectedCountry: [country_list][selection][row] })}
                                    data={[country_list]}
                                />
                            </View>

                            <View style={{
                                padding: wp(3),
                                height: hp(8),
                                flex: 3.5,
                                backgroundColor: colors.WHITE,
                                borderTopRightRadius: wp(3),
                                borderBottomRightRadius: wp(3),
                            }}>
                                <TextInput
                                    ref={(ref) => { this.phoneNumberRef = ref; }}
                                    onChangeText={(text) => this.updateText(text, 'phoneNumber')}
                                    placeholder={'Enter mobile number'}
                                    onFocus={() => this.setState({ error: '' })}
                                    value={phoneNumber}
                                    style={{ borderBottomWidth: 1, borderBottomColor: colors.BLACK, }}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </View>
                        ||
                        <View style={{ marginTop: wp(5) }}>
                            <CustomTextInput
                                textInputOuterViewStyle={{
                                    height: hp(6),
                                    borderRadius: wp(1),
                                    borderColor: colors.SILVER,
                                    borderWidth: wp(0.2)
                                }}
                                placeHolderText={'Email'}
                                onChangeText={(value) => this.updateText(value, 'email')}
                            />


                            <CustomTextInput
                                textInputOuterViewStyle={{
                                    height: hp(6),
                                    borderRadius: wp(1),
                                    borderColor: colors.SILVER,
                                    borderWidth: wp(0.2)
                                }}
                                placeHolderText={'Password'}
                                onChangeText={(value) => this.updateText(value, 'password')}
                                secureText={true}
                            />
                        </View>
                    }
                    <SmallAppButton btnStyle={{ width: wp(22), marginTop: wp(5)}} onPress={this.onContinueClick} btnTitle={'Continue'} />
                </ImageBackground>
                {(this.state.isCustomAlertShow) &&
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
export { SignInWithPhone }
