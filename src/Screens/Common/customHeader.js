import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet , TouchableOpacity, TextInput, StatusBar} from 'react-native';
import {colors, wp, fontSizes, hp} from '../../Helper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';

class CustomHeader extends Component {

    onBackPress = (drawerMenu) => {
        if(!drawerMenu)
            this.props.navigation.goBack();
        else
            this.props.navigation.openDrawer();
    }

    render() {

        const { container, arrowContainer, titleTextStyle, searchView, homeView } = styles;
        const {
            isBack,
            isFilters,
            isCreateMenu,
            isInbox,
            isDrawerIcon,
            isHome,
            isProfile,
            leftIcon,
            isFaq,
            isFeedback,
            isTermsAndConditions,
            isCommunicationPreferences,
            isAboutUs,
            isDeliveryArea,
            isVideoDetailScreen,
            isChefScreen,
            isDish,
            isAddressList,
            titleText,
            isAddAddress,
            isOrderStatusMap,
            isOrderList,
            isOrderDetail,
            isChat
        } = this.props;

        let menuTitle = (isAboutUs) && 'About Us'
            || (isDeliveryArea) && 'Delivery Areas'
            || (isVideoDetailScreen) && 'How to Videos'
            || (isCommunicationPreferences) && 'Communication Preferences'
            || (isInbox) && 'Inbox'
            || (isProfile) && 'Profile'
            || (isTermsAndConditions) && 'Terms And Conditions'
            || (isFeedback) && 'Feedback'
            || (isFaq) && 'FAQ'
            || (isFilters) && 'Filters'
            || (isCreateMenu) && 'Create Menu'
            || (isAddressList) && (titleText) ? titleText : ''
            || (isAddAddress) && (titleText) ? titleText : ''
            || (isOrderStatusMap) && (titleText) ? titleText : ''
            || (isOrderList) && (titleText) ? titleText : ''
            ||(isOrderDetail) && (titleText) ? titleText : ''
            ||(isChat) && (titleText) ? titleText : ''
            || '';

        return(
            <SafeAreaView style={{flex: 1}}>

                { (isBack || isDrawerIcon) &&
                    <View
                    style={[container, {justifyContent: (isBack || isDrawerIcon) ? 'flex-start': 'center'}]}>
                    <TouchableOpacity
                        onPress={() => this.onBackPress(isDrawerIcon)}
                        style={arrowContainer}>
                        <Icon
                            name={(isBack) && 'md-arrow-back' || 'ios-menu'}
                            size={wp(7)}
                            color={colors.WHITE}
                        />
                    </TouchableOpacity>
                    <Text style={titleTextStyle}>{menuTitle}</Text>
                </View>}

                {
                    (isHome) && <View
                        style={container}>
                        <View style={homeView}>
                            <Icon
                                style={{flex: 1, alignSelf: 'center'}}
                                name={'md-search'}
                                size={hp(3)}
                                color={colors.SKYBLUE}
                            />
                            <TextInput
                                style={{
                                    padding: wp(2),
                                    width: wp(50),
                                    flex: 9
                                }}
                                placeholder={ 'A-693, Gujarat Housing Board Laxmi Nagar' }
                                placeholderTextColor={colors.LIGHTGRAY}
                            />
                        </View>
                    </View>
                }

                {
                    (!isHome && !isBack && !isProfile && !isDrawerIcon) &&
                    <View  style={[container, {flexDirection: 'column'}]}>
                        <View style={container}>
                            <View style={[searchView, {marginTop: (isChefScreen) ? wp(2) : wp(3.5)}]}>
                                <Icon
                                    style={{flex: 1, alignSelf: 'center'}}
                                    name={'md-search'}
                                    size={hp(3)}
                                    color={colors.SKYBLUE}
                                />

                                <TextInput
                                    style={{
                                        padding: wp(2),
                                        width: wp(50),
                                        flex: 9
                                    }}
                                    placeholder={ '436, GIDC Pandesara RD, Gujarat Housing' }
                                    placeholderTextColor={colors.LIGHTGRAY}
                                />
                            </View>
                        </View>
                        {
                            (isDish) && <View style={[container,{
                                paddingVertical: wp(0),
                                alignItems: 'flex-start'
                            }]}>
                                <View style={{
                                    marginHorizontal: wp(2),
                                    flex: 1,
                                    backgroundColor: colors.WHITE,
                                    height: wp(9),
                                    flexDirection: 'row',
                                    borderRadius: wp(3),
                                    paddingHorizontal: wp(5)
                                }}>
                                    <Icon1
                                        style={{flex: 1, alignSelf: 'center'}}
                                        name={'location-pin'}
                                        size={hp(3)}
                                        color={colors.BLOODYRED}
                                    />

                                    <TextInput
                                        style={{
                                            padding: wp(2),
                                            width: wp(50),
                                            flex: 9
                                        }}
                                        placeholder={ 'Home' }
                                        placeholderTextColor={colors.LIGHTGRAY}
                                    />
                                </View>
                            </View>
                        }
                    </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APPGREEN,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: wp(1.5)
    },
    arrowContainer: {
        height: wp(8),
        width: wp(10),
        marginRight: wp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTextStyle: {
        color: colors.WHITE,
        fontWeight: 'bold',
        fontSize: fontSizes.medium,
        marginBottom: wp(2)
    },
    searchView: {
        margin: wp(2),
        flex: 1,
        backgroundColor: colors.WHITE,
        height: wp(9),
        flexDirection: 'row',
        borderRadius: wp(3),
        paddingHorizontal: wp(5)
    },
    homeView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        margin: wp(2),
        height: wp(10),
        flexDirection: 'row',
        borderRadius: wp(3),
        paddingHorizontal: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export {CustomHeader };
