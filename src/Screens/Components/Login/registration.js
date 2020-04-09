import React, { Component } from 'react';
import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import { colors, hp, wp, fontSizes, boxShadow, validateEmail } from '../../../Helper';
import { SmallAppButton, CustomTextInput, Banner, DropDownMenu, ProcessIndicator } from '../../Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {StackActions, NavigationActions}  from 'react-navigation';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBanner: false,
            name: '',
            mobile: '',
            password: '',
            selectedCountry: '',
            confirmPassword: '',
            email: '',
            role: '',
            error: '',
            country_code_Arr: [],
            isRegisterSuccess: false,
        }
    }

    componentDidMount() {
        const { handleLocalAction, localActions } = this.props;
        handleLocalAction({ type: localActions.GET_COUNTRY_LIST })
    }

    componentWillReceiveProps(nextProps) {
        const { User } = nextProps;
        const { userSignup, countries } = User;
        const { country_code_Arr } = this.state;
        if (countries && countries.success && countries.data && countries.data.length > 0 && country_code_Arr !== countries.data) {
            this.setState({
                country_code_Arr: countries.data
            })
        }

        if(this.props.User.userSignup !== userSignup) {
            if (userSignup && userSignup.success) {
                this.setState({
                    isRegisterSuccess: true,
                    name: '',
                    mobile: '',
                    password: '',
                    selectedCountry: '',
                    confirmPassword: '',
                    country_id: '',
                    email: '',
                    role: '',
                    error: '',
                }, () => {
                    this.hideBanner(true);
                })
            } else {
                let error = userSignup && userSignup.message;
                this.setState({ error })
            }
        }
    }

    onSignUpClick = () => {
        const { name, mobile, password, confirmPassword, email, selectedCountry, country_code_Arr } = this.state;
        const { handleLocalAction, localActions } = this.props;
        let selectedCountryData = country_code_Arr.filter((data) => data.country_code === selectedCountry)

        if (name === '') {
            this.updateText('Please enter name', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (email === '') {
            this.updateText('Please enter email', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (!validateEmail(email)) {
            this.updateText('Please enter valid email', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (password === '') {
            this.updateText('Please enter password', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (mobile.length < 10) {
            this.updateText('Mobile Number should have 10 digits', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (password.length < 8) {
            this.updateText('Password length should be atleast 8 characters', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (confirmPassword === '') {
            this.updateText('Please enter confirm password', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (confirmPassword.length < 8) {
            this.updateText('Confirm Password length should be atleast 8 characters', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        if (password !== confirmPassword) {
            this.updateText('Password and confirm password are different', 'error');
            this.setState({ showBanner: true }, () => {
                this.hideBanner();
            })
            return
        }

        this.updateText('', 'error');
        handleLocalAction({ type: localActions.SIGN_UP_USER, data: { name, mobile, password, confirmPassword, email, country_code: selectedCountry, country_id: selectedCountryData[0].id} })
    }

    hideBanner = (isSuccessBanner = false) => {
        setTimeout(() => {
            this.setState({
                isRegisterSuccess: false,
                name: '',
                mobile: '',
                password: '',
                selectedCountry: '',
                confirmPassword: '',
                email: '',
                role: '',
                error: '',
            }, () => {
                let resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                })
                this.props.navigation.dispatch(resetAction);
            })
        }, 3000);
    }

    updateValue(text, field) {
        this.setState({
            [field]: text,
            error: ''
        });
    }

    updateText = (val, key) => {
        this.setState({
            [key]: val
        })
    }

    render() {

        const { error, showBanner, country_code_Arr, isRegisterSuccess, selectedCountry } = this.state;
        const { User } = this.props;
        const { processing } = User;
        let allCountryCodeData = country_code_Arr.length > 0 && country_code_Arr.map(i => i.country_code);
        let country_list = allCountryCodeData.length > 0 && allCountryCodeData.filter((item, i, ar) => ar.indexOf(item) === i);

        let safeArea = {
            top: 20
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ProcessIndicator color={colors.WHITE} isProcessing={processing} />
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../../../../assets/splash.png')}
                        style={{
                            flex: 1,
                            paddingTop: hp(15),
                            paddingHorizontal: hp(5),
                        }}>
                        {
                            (showBanner && error !== '') &&
                            <Banner title={''} showBanner={showBanner} message={error} safeArea={safeArea} isError={true} />
                        }

                        {
                            (isRegisterSuccess) &&
                            <Banner title={''} showBanner={isRegisterSuccess} message={'You are registered successfully'} safeArea={safeArea} />
                        }

                        <Text style={{
                            color: colors.WHITE,
                            fontWeight: '900',
                            fontSize: fontSizes.xxxlarge,
                            alignSelf: 'center'
                        }}>
                            {"Sign Up"}
                        </Text>

                        <Text style={{
                            color: colors.WHITE,
                            fontWeight: 'bold',
                            fontSize: fontSizes.largel,
                            marginVertical: wp(2.5),
                            marginHorizontal: wp(5)
                        }}>
                            {"Hello, Let's Join!"}
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            scrollForExtraHeightOnAndroid={'100%'}
                            keyboardShouldPersistTaps='handled'
                            extraScrollHeight={hp(2)}
                            style={{ marginBottom: hp(0) }}
                            contentContainerStyle={{ paddingBottom: hp(0) }}
                            showsVerticalScrollIndicator={false}
                        >
                            <CustomTextInput
                                textInputOuterViewStyle={{ height: hp(5) }}
                                iconFileName={'FontAwesomeIcon'}
                                iconName={'user-circle'}
                                placeHolderText={'Full Name'}
                                onChangeText={(value) => this.updateValue(value, 'name')}
                            />

                            <CustomTextInput
                                textInputOuterViewStyle={{ height: hp(5) }}
                                iconFileName={'MaterialCommunityIconsIcon'}
                                iconName={'email'}
                                placeHolderText={'Email'}
                                onChangeText={(value) => this.updateValue(value, 'email')}
                                keyboardType={'email-address'}
                            />
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <DropDownMenu
                                    style={{
                                        borderRadius: wp(3),
                                        height: hp(5),
                                        marginRight: wp(1),
                                        alignItems: 'center'
                                    }}
                                    bgColor={colors.WHITE}
                                    tintColor={'#666666'}
                                    activityTintColor={'green'}
                                    handler={(selection, row) => this.setState({ selectedCountry: [country_list][selection][row] })}
                                    data={[country_list]}
                                />

                                <CustomTextInput
                                    textInputOuterViewStyle={{ height: hp(5), width: wp(65) }}
                                    iconFileName={'MaterialCommunityIconsIcon'}
                                    iconName={'phone'}
                                    placeHolderText={'Mobile Number'}
                                    onChangeText={(value) => this.updateValue(value, 'mobile')}
                                    keyboardType={'number-pad'}
                                    maxLength={10}
                                />

                            </View>

                            <CustomTextInput
                                textInputOuterViewStyle={{ height: hp(5) }}
                                iconFileName={'MaterialCommunityIconsIcon'}
                                iconName={'lock-outline'}
                                placeHolderText={'Password'}
                                onChangeText={(value) => this.updateValue(value, 'password')}
                                secureText={true}
                            />

                            <CustomTextInput
                                textInputOuterViewStyle={{ height: hp(5) }}
                                iconFileName={'MaterialCommunityIconsIcon'}
                                iconName={'lock-outline'}
                                placeHolderText={'Confirm Password'}
                                onChangeText={(value) => this.updateValue(value, 'confirmPassword')}
                                secureText={true}
                            />

                            <SmallAppButton
                                btnStyle={{ width: wp(65), marginTop: wp(5) }}
                                onPress={() => this.onSignUpClick()}
                                btnTitle={'Register'} />

                            <Text
                                onPress={() => {
                                    this.setState({
                                        name: '',
                                        mobile: '',
                                        password: '',
                                        selectedCountry: '',
                                        confirmPassword: '',
                                        email: '',
                                        role: '',
                                        error: '',
                                    }, () => {
                                        let resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'InitialScreen' })],
                                        })
                                        this.props.navigation.dispatch(resetAction);
                                    })
                                }}
                                style={{
                                    color: colors.WHITE,
                                    fontWeight: 'bold',
                                    fontSize: fontSizes.largel,
                                    marginVertical: wp(2.5),
                                    marginHorizontal: wp(5),
                                    alignSelf: 'center'
                                }}>
                                {"Already have an account "}
                                <Text style={{
                                    color: colors.APPGREEN
                                }}>{'Sign In'}</Text>
                            </Text>
                        </KeyboardAwareScrollView>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        )
    }
}

export { Registration }
