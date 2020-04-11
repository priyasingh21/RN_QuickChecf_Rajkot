import React, { Component } from 'react';
import {View, Text, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, BackHandler, } from 'react-native';
import {boxShadow, colors, fontSizes, hp, wp, snackData, lunchData} from '../../../Helper'
import {AppButton, CustomHeader, ProcessIndicator} from '../../Common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/AntDesign';
import { NavigationEvents } from 'react-navigation';

class DishScreen extends Component{

    constructor(props) {
        super(props);
        let navData = props && props.navigation && props.navigation.state && props.navigation.state.params;
        let menuDishes = props.MenuCategory
        menuDishes = menuDishes.menuTypeData || menuDishes.menus
        menuDishes = menuDishes && menuDishes.data && menuDishes.data;
        this.state={
            navigationDisplayKey: navData && navData.displayKey || '',
            dishes: [],
            isEmpty: props && props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.isEmpty && props.navigation.state.params.isEmpty || false,
            isLoading: true
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    componentDidMount() {
        const { handleLocalAction, localActions, navigation } = this.props;
        handleLocalAction({ type: localActions.LOAD_DISHES_DATA })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {dishes, isEmpty, navigationDisplayKey} = this.state;
        let navData = nextProps && nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.displayKey;
        if(this.props !== nextProps){

            let nextIsEmpty = nextProps && nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.isEmpty && nextProps.navigation.state.params.isEmpty
            let isNavigateData = nextProps && nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.data && nextProps.navigation.state.params.data

            if(navigationDisplayKey !== navData) {
                this.setState({
                    navigationDisplayKey: navData,
                })
            } else if(navigationDisplayKey && nextProps && nextProps.navigation && nextProps.navigation.state && !nextProps.navigation.state.params) {
                this.setState({
                    navigationDisplayKey: false,
                })
            }

            if(isEmpty !== nextIsEmpty) {
                this.setState({
                    isEmpty: nextIsEmpty,
                    isShowItemPopup: false
                })
            }

            if(dishes !== isNavigateData) {
                this.setState({
                    dishes: isNavigateData,
                    isLoading: true
                }, () => {
                    this.handleLoader();
                })
            }

            if (nextProps.MenuCategory && nextProps.MenuCategory.menus && !isNavigateData) {
                if(nextProps.MenuCategory.menus && nextProps.MenuCategory.menus.success) {
                    this.setState({
                        dishes: nextProps.MenuCategory.menus.data,
                        isLoading: true
                    }, () => {
                        this.handleLoader();
                    })
                }
            }
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
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
                            return(
                                <View key={data.index} style={{
                                    height: hp(20),
                                    width: wp(85),
                                    borderRadius: wp(3),
                                    backgroundColor: colors.SILVER,
                                    overflow: 'hidden',
                                    marginRight: wp(2),
                                    alignSelf: 'center'
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
                                <Icon1
                                    name={'right'}
                                />
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
                                <Icon1
                                    name={'right'}
                                />
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
                                <Icon1
                                    name={'right'}
                                />
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
                                <Icon1
                                    name={'right'}
                                />
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
                                <Icon1
                                    name={'right'}
                                />
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
                                <Icon1
                                    name={'right'}
                                />
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }

    renderAllDishes = ({item, index}) => {
        const {
            id, user_id, cuisine_id, is_available_today, is_for_bulk, is_special, is_published, highlight, location, lat, long, status,
            menu_type_id, address_id, title, description, classification_id,classification, is_on_request, is_for_period, fromdate, todate,
            images, on_request, on_weekends, formated_tags, menu_type, cuisine, tags
        } = item;

        return(
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
                        <Icon1
                            name={'right'}
                        />
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
                        <Icon1
                            name={'right'}
                        />
                    </View>
                </ScrollView>
            </View>
        )
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
                            <Icon
                                name={'star'}
                                color={colors.STARYELLOW}
                                style={{
                                    marginHorizontal: wp(1)
                                }}
                            />
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
                    <Icon name={materialRupeeIconName}size={wp(4)} />
                    <Text>{price}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    handleLoader = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    }

    render() {
        const {navigation} = this.props;
        const {navigationDisplayKey, dishes, isEmpty, isLoading} = this.state;
        const {container, detailContainer, filterContainer, searchTextView, textStyle, normalTextStyle, noMessageContainer} = styles

        return(
            <View style={container}>
                <ProcessIndicator color={colors.WHITE} isProcessing={isLoading} />
                <View style={{height: hp(22)}}>
                    <CustomHeader
                        navigation={navigation}
                        navigationParam={navigationDisplayKey}
                        isDish={true}
                    />
                </View>

                <NavigationEvents
                    onWillBlur={payload => {
                        this.setState({
                            navigationDisplayKey: ''
                        })
                    }}
                />
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
                    {(navigationDisplayKey === 'ForYou') && this.renderForYou(isEmpty)}

                    {(navigationDisplayKey === 'Cuisine') && this.renderCuisine(isEmpty)}

                    {(navigationDisplayKey === 'MenuSelection') && this.renderMenuSelection(isEmpty)}

                    {(dishes && dishes.length > 0 && !navigationDisplayKey) &&
                    <FlatList
                        data={dishes}
                        renderItem={this.renderAllDishes}
                        style={{padding: wp(5), marginBottom: wp(2)}}
                        showsVerticalScrollIndicator={false}
                    />
                    }
                    {
                        (!navigationDisplayKey && dishes && dishes.length === 0) &&
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
