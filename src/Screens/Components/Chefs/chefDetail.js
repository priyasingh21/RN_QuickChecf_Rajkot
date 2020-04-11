import React, { Component } from 'react';
import {View, Text, FlatList, Image, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import { boxShadow, colors, hp, wp, fontSizes } from '../../../Helper'
import {Banner, CustomHeader, ProcessIndicator} from '../../Common';
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage';

let token = AsyncStorage.getItem('loginData')

class ChefDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chef: [],
            showBanner: false,
            bannerMessage: '',
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    UNSAFE_componentWillMount() {
        const { handleLocalAction, localActions, navigation } = this.props;
        let chefParamDetail = navigation.state && navigation.state.params && navigation.state.params && navigation.state.params.chefDetails;
        token.then(res => {
            (chefParamDetail && chefParamDetail.id) && handleLocalAction({ type: localActions.GET_CHEF, data: {chef_id: chefParamDetail.id, api_token: JSON.parse(res).data[0].api_token} })
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { singleChef } = nextProps;
        const { chef } = this.state;
        if (singleChef && singleChef.data && singleChef.data.length > 0 && (JSON.stringify(chef) !== JSON.stringify(singleChef.data))) {
            this.setState({ isLoading: false, chef: singleChef.data })
        }
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    loader = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 3000)
    }

    toggleChefFollow = () => {
        const { handleLocalAction, localActions, navigation } = this.props;
        let chefParamDetail = navigation.state && navigation.state.params && navigation.state.params && navigation.state.params.chefDetails;
        this.setState({
            showBanner: true,
            bannerMessage: 'Follow actions changed..!!'
        }, () => {
            token.then(res => {
                (chefParamDetail && chefParamDetail.id) && handleLocalAction({ type: localActions.TOGGLE_FOLLOW_CHEF, data: {chef_id: chefParamDetail.id, api_token: JSON.parse(res).data[0].api_token} })
                this.hideBanner();
            })
        });
    }

    hideBanner = () => {
        setTimeout(() => {
            this.setState({
                showBanner: false,
                bannerMessage: ''
            })
        }, 3000)
    }

    render() {
        const { navigation, User } = this.props;
        const { chef, isLoading, showBanner, bannerMessage } = this.state;
        const { container, detailContainer } = styles;
        let safeArea = {
            top: 20
        }
        let chefParamDetail = navigation.state && navigation.state.params && navigation.state.params && navigation.state.params.chefDetails;
        const {id, name, country_code, mobile, location, area, status, role, email, followings_count, followers_count, temp_image, profile_image, is_customer, is_chef, has_address, address} = chefParamDetail;
        return (
            <View style={container}>
                {/*<ProcessIndicator color={colors.WHITE} isProcessing={chef.length <= 0} />*/}
                <View style={{ height: hp(12) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isChefDetail={true}
                        titleText={'Chef Details'}
                        isBack={true}
                    />

                    {
                        (showBanner && bannerMessage !== '') && <Banner
                            title={''}
                            showBanner={showBanner}
                            message={bannerMessage}
                            safeArea={safeArea}
                            bannerColor={colors.SOILTEXTCOLOR}
                        />
                    }

                </View>

                <View style={detailContainer} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: colors.SILVER,
                                fontSize: fontSizes.largel
                            }}>{'Loading Chef Details...'}</Text>
                        </View>

                    <TouchableOpacity
                        onPress={this.toggleChefFollow}
                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.SKYBLUE, marginVertical: wp(10), marginHorizontal: wp(10) }}
                    >
                        <Text style={{
                            color: colors.SILVER,
                            fontSize: fontSizes.largel
                        }}>{'Toggle Follow'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APPGREEN
    },
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    chefSearchContainer: {
        height: hp(15),
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHTGRAY,
        justifyContent: 'center',
        marginBottom: wp(6),
        borderRadius: wp(5),
        ...boxShadow,
        backgroundColor: colors.OFFGREEN,
        paddingHorizontal: wp(3)
    },
    imageView: {
        height: wp(17),
        width: wp(17),
        borderRadius: wp(17) / 2,
        backgroundColor: colors.LIGHTGRAY,
        overflow: 'hidden',
        borderWidth: 0.2,
        borderColor: colors.LIGHTGRAY
    },
    rightImageView: {
        backgroundColor: colors.OLIVE,
        height: hp(9),
        width: hp(15),
        alignSelf: 'flex-end',
        marginTop: -wp(17),
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: wp(2)
    },
    starContainer: {
        backgroundColor: colors.WHITE,
        height: wp(7),
        width: wp(11),
        position: 'absolute',
        right: wp(18),
        top: wp(19),
        borderRadius: wp(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.BLACK,
        alignSelf: 'center'
    },
    tagContainer: {
        backgroundColor: colors.WHITE,
        height: wp(7),
        width: wp(7),
        position: 'absolute',
        right: wp(10),
        top: wp(19),
        borderRadius: wp(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { ChefDetail }
