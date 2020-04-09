import React, { Component } from 'react';
import {View, Text, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, BackHandler} from 'react-native';
import {boxShadow, colors, fontSizes, hp, wp, snackData, lunchData} from '../../../Helper'
import {AppButton, CustomHeader} from "../../Common";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class DishScreen extends Component{

    constructor(props) {
        super(props);
        let navData = props && props.navigation && props.navigation.state && props.navigation.state.params
        this.state={
            navigationDisplayKey: navData && navData.displayKey || '',
            dishes: props && props.MenuCategory && props.MenuCategory.menus && props.MenuCategory.menus.data || [],
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    componentDidMount() {
        const { handleLocalAction, localActions, navigation } = this.props;
        handleLocalAction({ type: localActions.LOAD_DISHES_DATA })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {dishes} = this.state;
        if (nextProps.MenuCategory && nextProps.MenuCategory.menus && JSON.stringify(dishes) !== JSON.stringify(nextProps.MenuCategory.menus)) {
            if(nextProps.MenuCategory.menus && nextProps.MenuCategory.menus.success) {
                this.setState({ dishes: nextProps.MenuCategory.menus.data })
            }
        }
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    renderDishes = ({item, index}) => {
        const {title, is_on_request, is_for_period, description, classification, images, formated_tags, menu_type, cuisine, tags} = item;
        return(
            <TouchableOpacity
                style={{
                    height: hp(25),
                    backgroundColor: colors.OFFGREEN,
                    marginVertical: wp(3),
                    borderRadius: wp(3),
                    paddingVertical: wp(2),
                    paddingHorizontal: wp(2),
                }}>
                    <Text style={{
                        fontSize: fontSizes.mini,
                        color: colors.APPBROWN,
                        alignSelf: 'center'
                    }}>{title && title || ''}</Text>

                {
                    (images && images.length > 0) &&
                    <FlatList
                        style={{flex: 1}}
                        horizontal
                        data={images}
                        renderItem={(data) => {
                            debugger
                            return(
                                <View key={data.index} style={{
                                    height: hp(20),
                                    width: wp(85),
                                    borderRadius: wp(3),
                                    backgroundColor: 'red',
                                    overflow: 'hidden',
                                    marginHorizontal: wp(2)
                                }}>
                                    <Image
                                        style={{ height: '100%', width: '100%' }}
                                        source={{ uri: data.item.url }} />
                                </View>
                            )
                        }}
                    />
                }
            </TouchableOpacity>
        )
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    render() {
        const {navigation} = this.props;
        const {navigationDisplayKey, dishes} = this.state;
        const {container, detailContainer, filterContainer, searchTextView, textStyle, normalTextStyle, noMessageContainer} = styles;
        return(
            <View style={container}>
                <View style={{height: hp(22)}}>
                    <CustomHeader
                        navigation={navigation}
                        navigationParam={navigationDisplayKey}
                        isDish={true}
                    />
                </View>

                <View style={detailContainer} >
                    <View style={filterContainer}>
                        <View style={{flex: 0.6}}>
                            <Icon
                                name={'filter-outline'}
                                size={wp(7)}
                                style={{marginTop: wp(0)}}
                                color={colors.APPGREEN}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Filters')}
                            style={searchTextView}>
                            <Text style={textStyle}>{'Advanced Search'}</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        (dishes && dishes.length > 0) &&
                        <FlatList
                            data={dishes}
                            renderItem={this.renderDishes}
                            style={{ padding: wp(5), marginBottom: wp(2) }}
                            showsVerticalScrollIndicator={false}
                        /> ||
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: colors.SILVER,
                                fontSize: fontSizes.largel
                            }}>{'Loading Dishes...'}</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: colors.APPGREEN
    },
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    filterContainer: {
        position: 'absolute',
        top: -wp(5),
        left: wp(30),
        height: wp(10),
        width: wp(45),
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        borderRadius: wp(2),
        ...boxShadow,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchTextView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.BLACK,
        fontSize: fontSizes.medium,
        fontWeight: 'bold'
    },
    normalTextStyle: {
        color: colors.WHITE,
        fontSize: fontSizes.xsmall,
    },
    noMessageContainer: {
        height: hp(7),
        width: hp(45),
        backgroundColor: colors.APPGREEN,
        marginTop: wp(20),
        alignSelf: 'center',
        borderRadius: hp(2),
        padding: wp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomTransparentView: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.BLACKTRANSPARENT,
        height: hp(100),
        width: wp(100)
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.WHITE,
        height: hp(60),
        width: wp(100)
    },
    bottomHeaderView: {
        height: '10%',
        backgroundColor: colors.APPGREEN,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(7)
    },
    currencyView: {
        backgroundColor: colors.SILVER,
        flexDirection: 'row',
        position: 'absolute',
        top: hp(25),
        left: wp(10),
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { DishScreen }
