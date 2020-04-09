import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { colors, fontSizes, hp, wp, boxShadow } from '../../../Helper'
import { AppButton, CustomHeader, Banner } from "../../Common";
import Icon from 'react-native-vector-icons/AntDesign';

class AccountScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props && props.User && props.User.user && props.User.user.data && props.User.user.data.length > 0 && props.User.user.data[0] || {},
            showBanner: false,
            bannerMessage: ''
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    componentDidMount() {
        AsyncStorage.getItem('loginData').then(res => {
            if (res && JSON.parse(res).success) {
                this.setState({
                    user: JSON.parse(res).data[0]
                })
            }
        }).catch(e => { })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {User} = nextProps;
        const {user} = User
        if(this.props !== nextProps) {
            AsyncStorage.getItem('loginData').then(res => {
                if (res && JSON.parse(res).success) {
                    this.setState({
                        user: JSON.parse(res).data[0]
                    })
                }
            }).catch(e => { })
        }
    }

    handleBecomeChef = () => {
        this.setState({
            showBanner: true,
            bannerMessage: 'Thank you for becoming a valuable chef...!!!'
        });
        this.hideBanner();
    }

    handleEditProfile = () => {

    }

    hideBanner = () => {
        setTimeout(() => {
            this.setState({
                showBanner: false,
                bannerMessage: ''
             })
        }, 3000)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    render() {
        const { user, showBanner, bannerMessage } = this.state;
        const { container, detailContainerMainView, profileImageView, textStyle, appButtonView, chefMenuView,
            chefMenuContainer, chefMenuTextStyle } = styles;
        const { country_code, email, mobile, profile_image, temp_image, name, location, is_chef, is_customer } = user
        let safeArea = {
            top: 20
        }
        return (
            <View style={container}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isProfile={true}
                        titleText={'Profile'}
                        isDrawerIcon={true}
                    />
                </View>

                {
                    (showBanner && bannerMessage !== '') && <Banner
                    title={''}
                    showBanner={showBanner}
                    message={bannerMessage}
                    safeArea={safeArea}
                    bannerColor={colors.SOILTEXTCOLOR}
                    />
                }
                <ScrollView style={detailContainerMainView}>
                    <View>
                        <View style={profileImageView}>
                            <Image
                                source={{ uri: profile_image || temp_image }}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </View>

                        <Text style={[textStyle, { marginTop: wp(3) }]}>{name || ''}</Text>

                        <Text style={[textStyle, { marginTop: wp(1) }]}>{`${country_code}${mobile}`}</Text>

                        <Text style={[textStyle, { marginTop: wp(1) }]}>{email}</Text>

                        <Text style={[textStyle, { marginTop: wp(1) }]}>{location || ''}</Text>

                        <Text style={[textStyle, {
                            color: colors.SILVER,
                            alignSelf: 'flex-start',
                            marginTop: wp(5),
                            fontSize: fontSizes.medium
                        }]}>{'Bio:'}</Text>

                        <Text style={{
                            color: colors.SILVER,
                            alignSelf: 'flex-start',
                            marginVertical: wp(2),
                            fontSize: fontSizes.medium
                        }}>{'Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Fames in pharetra pulvinar\ndignissim. Vestibulum orci est eu at quis. Vitae,'}</Text>

                        <Text style={[textStyle, {
                            color: colors.SILVER
                        }]}>{'Join since Jan 2020'}</Text>

                        <View style={appButtonView}>
                            <AppButton
                                buttonText={'Edit My Profile'}
                                textColor={colors.WHITE}
                                backgroundColor={colors.APPGREEN}
                                onBtnPress={this.handleEditProfile}
                            />
                        </View>
                        {
                            (is_customer && !is_chef) &&
                            <View style={[appButtonView, { marginVertical: wp(2), marginTop: -wp(4) }]}>
                                <AppButton
                                    buttonText={'Become a Chef'}
                                    textColor={colors.WHITE}
                                    backgroundColor={colors.MARINER}
                                    onBtnPress={this.handleBecomeChef}
                                />
                            </View>
                        }

                        {
                            (!is_chef) &&
                            <View style={chefMenuContainer}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('CreateMenu')}
                                >
                                    <View style={chefMenuView} >
                                        <Text style={chefMenuTextStyle}>{'+'}</Text>
                                    </View>
                                    <Text style={[chefMenuTextStyle, { color: colors.APPBROWN, fontSize: fontSizes.medium, marginTop: wp(1), alignSelf: 'center' }]}>{'Add Menu'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={() => this.props.navigation.navigate('CreateMenu')}>
                                    <View style={chefMenuView} >
                                        <Icon
                                            name={'edit'}
                                            size={wp(5)}
                                            color={colors.WHITE}
                                        />
                                    </View>
                                    <Text style={[chefMenuTextStyle, { color: colors.APPBROWN, fontSize: fontSizes.medium, marginTop: wp(1), alignSelf: 'center' }]}>{'Edit Menu'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={() => this.props.navigation.navigate('OrderList')}>
                                    <View style={chefMenuView} >
                                        <Text style={chefMenuTextStyle}>{'0'}</Text>
                                    </View>
                                    <Text style={[chefMenuTextStyle, { color: colors.APPBROWN, fontSize: fontSizes.medium, marginTop: wp(1), alignSelf: 'center' }]}>{'My Order'}</Text>
                                </TouchableOpacity>
                            </View>
                            || null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APPGREEN,
    },
    detailContainerMainView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        paddingHorizontal: wp(8),
    },
    profileImageView: {
        alignSelf: 'center',
        height: hp(15),
        width: hp(15),
        borderRadius: hp(15) / 2,
        marginTop: hp(6),
        borderColor: colors.BLACK,
        borderWidth: wp(0.1),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.APPBROWN,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    appButtonView: {
        alignSelf: 'center',
        marginVertical: wp(4)
    },
    chefMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3)
    },
    chefMenuView: {
        height: hp(8),
        width: hp(8),
        backgroundColor: colors.APPGREEN,
        borderRadius: hp(8) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        ...boxShadow
    },
    chefMenuTextStyle: {
        fontWeight: 'bold',
        color: colors.WHITE,
        fontSize: fontSizes.largel
    }
})

export { AccountScreen }
