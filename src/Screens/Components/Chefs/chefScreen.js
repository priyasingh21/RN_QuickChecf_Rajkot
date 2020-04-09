import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, BackHandler } from 'react-native';
import { boxShadow, colors, hp, wp, fontSizes } from '../../../Helper'
import { CustomHeader, ProcessIndicator } from "../../Common";
import Icon from 'react-native-vector-icons/AntDesign'

class ChefScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chef: [],
            isLoading: true
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    UNSAFE_componentWillMount() {
        const { handleLocalAction, localActions, navigation } = this.props;
        handleLocalAction({ type: localActions.GET_ALL_CHEF })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { chefData } = nextProps;
        const { chef } = this.state;
        if (chefData && chefData.data && chefData.data.length > 0 && (JSON.stringify(chef) !== JSON.stringify(chefData.data))) {
            this.setState({ isLoading: false, chef: chefData.data })
        }
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    renderChef = ({ item }) => {
        const { chefSearchContainer, imageView, rightImageView, starContainer, textStyle, tagContainer } = styles;
        let city = item.city || 'Mumbai';
        let distance = item.distance || '5';
        let reviewCount = item.reviewCount || '1000';
        let followings_count = item.followings_count || '10';
        let followers_count = item.followers_count || '5';
        let profile_image = item.profile_image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS69rhd2wmjxNTRArQI9r_zVoj_avEoB4ZeNRjBWkwtIZHIgbZ9';
        let temp_image = item.temp_image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS69rhd2wmjxNTRArQI9r_zVoj_avEoB4ZeNRjBWkwtIZHIgbZ9';

        return (
            <View style={chefSearchContainer}>
                <View style={{ paddingHorizontal: wp(2), flexDirection: 'row' }}>
                    <View style={imageView}>
                        <Image
                            source={{ uri: profile_image }}
                            style={{ height: wp(17), width: wp(17), }}
                        />
                    </View>
                    <View style={{ marginLeft: wp(2) }}>
                        <Text style={{ fontWeight: 'bold', color: colors.MARINER }}>{item.name + "\n"}
                            <Text style={{ fontWeight: '300', color: colors.MARINER }}>{city}
                                <Text style={{ color: colors.APPBROWN, fontWeight: 'bold' }}>{' - '}</Text>
                                <Text style={{ color: colors.MARINER, fontWeight: '300' }}>{distance}</Text>
                                <Text style={{ color: colors.APPBROWN, fontWeight: 'bold' }}>{' km\n'}</Text>
                            </Text>

                            <Text style={{ fontWeight: 'bold', color: colors.APPBROWN }}>{'Reviews '}
                                <Text style={{ color: colors.MARINER, fontWeight: '300' }}>{reviewCount}</Text>
                            </Text>

                            <Text style={{ fontWeight: 'bold', color: colors.APPBROWN }}>{'\nFollowers '}
                                <Text style={{ color: colors.MARINER, fontWeight: '300' }}>{followers_count}</Text>
                            </Text>

                            <Text style={{ fontWeight: 'bold', color: colors.APPBROWN }}>{'\nFollowings '}
                                <Text style={{ color: colors.MARINER, fontWeight: '300' }}>{followings_count}</Text>
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={rightImageView}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: temp_image }} />
                </View>

                <View style={starContainer}>
                    <Icon
                        name={'star'}
                        size={wp(3.5)}
                        color={colors.STARYELLOW}
                    />
                    <Text style={textStyle}>{4.5}</Text>
                </View>

                <View style={tagContainer}>
                    <Icon
                        name={'tag'}
                        size={wp(4)}
                        color={colors.BLOODYRED}
                    />
                </View>
            </View>
        )
    }

    loader = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 3000)
    }

    render() {
        const { navigation, User } = this.props;
        const { chef, isLoading } = this.state;
        const { container, detailContainer } = styles;
        let navigationParam = navigation.state && navigation.state.params && navigation.state.params.displayKey || '';
        return (
            <View style={container}>
                <ProcessIndicator color={colors.WHITE} isProcessing={chef.length > 0 ? false : true} />
                <View style={{ height: hp(12) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        navigationParam={navigationParam}
                        isChefScreen={true}
                    />
                </View>

                <View style={detailContainer} >
                    {
                        (chef && chef.length > 0) &&
                        <FlatList
                            data={chef}
                            renderItem={this.renderChef}
                            style={{ padding: wp(5), marginBottom: wp(2) }}
                            showsVerticalScrollIndicator={false}
                        /> ||
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: colors.SILVER,
                                fontSize: fontSizes.largel
                            }}>{'Loading Chefs...'}</Text>
                        </View>
                    }

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

export { ChefScreen }
