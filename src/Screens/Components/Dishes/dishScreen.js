import React, { Component } from 'react';
import {View, Text, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, BackHandler} from 'react-native';
import {boxShadow, colors, fontSizes, hp, wp, snackData, lunchData} from '../../../Helper'
import {AppButton, CustomHeader} from "../../Common";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon1 from 'react-native-vector-icons/AntDesign'

class DishScreen extends Component{

    constructor(props) {
        super(props);
        this.state={
            isEmpty: props && props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.isEmpty && props.navigation.state.params.isEmpty || false,
            navigationDisplayKey: props && props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.displayKey && props.navigation.state.params.displayKey || '',
            navigationData: props && props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.menuData && props.navigation.state.params.menuData || [],
            isShowItemPopup: false,
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {isEmpty} = this.state;
        if(this.props !== nextProps){
            let nextIsEmpty = nextProps && nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.isEmpty && nextProps.navigation.state.params.isEmpty
            if(isEmpty !== nextIsEmpty) {
                this.setState({
                    isEmpty: nextIsEmpty,
                    isShowItemPopup: false
                })
            }
        }
    }

    renderSnack = ({item, index}) => {
        const {profileImage, name, ratings, reviewCount, distance, foodImage, price, bottomText} = item;
        let materialRupeeIconName = 'currency-inr';
        return(
            <TouchableOpacity
                onPress={() => this.setState({isShowItemPopup: true})}
                style={{
                    flex: 1,
                    width: wp(60),
                    marginRight: wp(6)
                }}>
                <View style={{flex: 2, flexDirection: 'row', marginVertical: wp(1)}}>
                    <View style={{
                        flex: 1,
                        borderRadius: wp(100) / 2,
                        overflow: 'hidden',
                    }}>
                        <Image
                            source={profileImage}
                            style={{height: '100%', width: '100%'}}
                        />
                    </View>

                    <View style={{
                        flex: 2.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors.DARKGRAY,
                            fontSize: fontSizes.xxxmini
                        }}>{name + "\n"+ distance + " km"}</Text>
                    </View>

                    <View style={{
                        flex: 1.5,
                    }}>
                        <View style={{
                            height: wp(6),
                            borderWidth: 1,
                            borderColor: colors.BLACK,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            {/*<Icon*/}
                            {/*    name={'star'}*/}
                            {/*    color={colors.STARYELLOW}*/}
                            {/*    style={{*/}
                            {/*        marginHorizontal: wp(1)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <Text style={{
                                color: colors.DARKGRAY,
                                fontSize: fontSizes.xxxmini
                            }}>{ratings}</Text>
                        </View>
                        <Text style={{
                            color: colors.DARKGRAY,
                            fontSize: fontSizes.xxxmini
                        }}>{reviewCount + " Reviews"}</Text>
                    </View>
                </View>
                <View style={{flex: 3, paddingVertical: wp(1)}}>
                    <View style={{
                        borderRadius: wp(3), overflow: 'hidden',
                    }}>
                        <Image
                            source={foodImage}
                            style={{height: '100%', width: '100%'}}
                        />
                    </View>
                </View>
                <View style={{flex: 1, marginVertical: wp(1)}}>
                    <Text>{bottomText}</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.APPGREEN,
                    borderRadius: wp(1.5),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: colors.WHITE
                    }}>{'Order Now'}</Text>
                </View>
                <View style={{
                    height: wp(6),
                    width: wp(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.WHITE,
                    position: 'absolute',
                    top: hp(12.5),
                    left: wp(0),
                    borderRadius: wp(1),
                    flexDirection: 'row'
                }}>
                    {/*<Icon name={materialRupeeIconName}size={wp(4)} />*/}
                    <Text>{price}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    renderForYou = (isEmpty) => {
        return (
            <View style={{flex: 1}}>
                {
                    !!(isEmpty) && <View style={{
                        height: hp(7),
                        width: hp(45),
                        backgroundColor: colors.APPGREEN,
                        marginTop: wp(20),
                        alignSelf: 'center',
                        borderRadius: hp(2),
                        padding: wp(2),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.large,
                            fontWeight: 'bold'
                        }}>{"We're Sorry - 0 menus found"}</Text>

                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.xsmall,
                        }}>{"You may apply/clear the filters to see what's available"}</Text>
                    </View>
                    ||
                    <View style={{marginVertical: wp(6)}}>
                        <ScrollView style={{height: hp(65)}} showsVerticalScrollIndicator={false}>
                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)
                                }}>{'Snacks'}</Text>

                                <FlatList
                                    data={snackData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>

                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)

                                }}>{'Lunch'}</Text>

                                <FlatList
                                    data={lunchData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }

    renderMenuSelection = (isEmpty) => {
        return (
            <View style={{flex: 1}}>
                {
                    !!(isEmpty) && <View style={{
                        height: hp(7),
                        width: hp(45),
                        backgroundColor: colors.APPGREEN,
                        marginTop: wp(20),
                        alignSelf: 'center',
                        borderRadius: hp(2),
                        padding: wp(2),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.large,
                            fontWeight: 'bold'
                        }}>{"We're Sorry - 0 menus found"}</Text>

                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.xsmall,
                        }}>{"You may apply/clear the filters to see what's available"}</Text>
                    </View>
                    ||
                    <View style={{marginVertical: wp(6)}}>
                        <ScrollView style={{height: hp(65)}} showsVerticalScrollIndicator={false}>
                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)
                                }}>{'Snacks'}</Text>

                                <FlatList
                                    data={snackData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>

                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)

                                }}>{'Lunch'}</Text>

                                <FlatList
                                    data={lunchData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }

    renderCuisine = (isEmpty) => {
        return (
            <View style={{flex: 1}}>
                {
                    !!(isEmpty) && <View style={{
                        height: hp(7),
                        width: hp(45),
                        backgroundColor: colors.APPGREEN,
                        marginTop: wp(20),
                        alignSelf: 'center',
                        borderRadius: hp(2),
                        padding: wp(2),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.large,
                            fontWeight: 'bold'
                        }}>{"We're Sorry - 0 menus found"}</Text>

                        <Text style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.xsmall,
                        }}>{"You may apply/clear the filters to see what's available"}</Text>
                    </View>
                    ||
                    <View style={{marginVertical: wp(6)}}>
                        <ScrollView style={{height: hp(65)}} showsVerticalScrollIndicator={false}>
                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)
                                }}>{'Snacks'}</Text>

                                <FlatList
                                    data={snackData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>

                            <View style={{
                                backgroundColor: colors.OFFGREEN,
                                height: hp(30),
                                borderRadius: wp(5),
                                paddingHorizontal: wp(5),
                                paddingVertical: wp(2.5),
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.large,
                                    fontWeight: 'bold',
                                    marginVertical: wp(1)

                                }}>{'Lunch'}</Text>

                                <FlatList
                                    data={lunchData}
                                    horizontal
                                    style={{
                                        flex: 1,
                                    }}
                                    renderItem={this.renderSnack}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View style={{
                                backgroundColor: colors.WHITE,
                                height: hp(6),
                                width: wp(20),
                                ...boxShadow,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.3),
                                marginHorizontal: wp(3),
                                marginVertical: wp(3),
                                borderRadius: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.medium,
                                    justifyContent: 'flex-end'
                                }}>{'More'}</Text>
                                {/*<Icon1*/}
                                {/*    name={'right'}*/}
                                {/*/>*/}
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }

    renderBottomItemPopup = () => {

        const {bottomTransparentView, bottomView, bottomHeaderView, currencyView} = styles
        return(
            <View style={bottomTransparentView}>
                <View style={bottomView}>
                    <View style={{flex: 1}}>
                        <View style={bottomHeaderView}>
                            <Text style={{
                                color: colors.WHITE,
                                fontSize: fontSizes.medium
                            }}>{'Buckwheat Cashew Cookies'}</Text>

                            {/*<Icon*/}
                            {/*    name={'close'}*/}
                            {/*    size={wp(6)}*/}
                            {/*    color={colors.WHITE}*/}
                            {/*    onPress={() => this.setState({isShowItemPopup: false})}*/}
                            {/*/>*/}
                        </View>
                        <ScrollView style={{flex: 1}}>
                            <View style={{height: hp(35)}}>
                                <Image
                                    source={require('../../../../assets/foodPlate.jpg')}
                                    style={{height: '100%', width: '100%'}}
                                />
                            </View>
                            <View style={currencyView}>
                                {/*<Icon*/}
                                {/*    name={'currency-inr'}*/}
                                {/*    size={wp(4)}*/}
                                {/*    color={colors.BLACK}*/}
                                {/*    onPress={() => this.setState({isShowItemPopup: false})}*/}
                                {/*/>*/}
                                <Text style={{
                                    color: colors.BLACK,
                                    fontSize: fontSizes.medium
                                }}>{'500'}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: wp(1),
                                paddingHorizontal: wp(3)
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.xxmini
                                }}>{'Any Day'}</Text>

                                {/*<Icon*/}
                                {/*    style={{marginHorizontal: wp(1)}}*/}
                                {/*    name={'pot'}*/}
                                {/*    size={wp(4)}*/}
                                {/*    color={colors.BLACK}*/}
                                {/*    onPress={() => this.setState({isShowItemPopup: false})}*/}
                                {/*/>*/}
                                <Text style={{color: colors.APPGREEN, fontSize: fontSizes.xmini}}>{'0'}
                                    <Text style={{ color: colors.BLACK}}>{'  mins'}</Text>
                                </Text>
                            </View>

                            <View style={{
                                paddingHorizontal: wp(3),
                            }}>
                                <Text>{'In a bowl, cream butter and brown sugar. Beat in egg and vanilla. Combine dry ingredients; add alternately with sour cream to creamed mixture. Stir in cashews. Drop by tablespoonfuls onto greased baking sheets. Bake at 375° until lightly browned, 8-10 minutes. Cool on a wire rack. For frosting, lightly brown butter in a small saucepan. Remove from the heat and cool slightly. Add cream and vanilla. Beat in confectioners\' sugar until smooth and thick. Frost cookies; if desired, top each with a cashew half.'}</Text>
                            </View>

                            <View style={{
                                paddingHorizontal: wp(3),
                                paddingVertical: wp(10)
                            }}>
                                <AppButton buttonText={'ADD TO BASKET'} styleBtn={{backgroundColor: colors.APPGREEN, alignSelf: 'center'}} textColor={colors.WHITE} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    render() {
        const {navigation} = this.props;
        const {navigationDisplayKey, isEmpty, isShowItemPopup} = this.state;
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
                            {/*<Icon*/}
                            {/*    name={'filter-outline'}*/}
                            {/*    size={wp(7)}*/}
                            {/*    style={{marginTop: wp(0)}}*/}
                            {/*    color={colors.APPGREEN}*/}
                            {/*/>*/}
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Filters')}
                            style={searchTextView}>
                            <Text style={textStyle}>{'Advanced Search'}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        (navigationDisplayKey === 'ForYou') && this.renderForYou(isEmpty)
                        || (navigationDisplayKey === 'Cuisine') && this.renderCuisine(isEmpty)
                        || (navigationDisplayKey === 'MenuSelection') && this.renderMenuSelection(isEmpty)
                        || <View style={noMessageContainer}>
                            <Text style={[textStyle, {
                                color: colors.WHITE,
                                fontSize: fontSizes.large,
                            }]}>{"We're Sorry - 0 menus found"}</Text>

                            <Text style={normalTextStyle}>{"You may apply/clear the filters to see what's available"}</Text>
                        </View>
                    }
                </View>
                {(isShowItemPopup) && this.renderBottomItemPopup()}
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
