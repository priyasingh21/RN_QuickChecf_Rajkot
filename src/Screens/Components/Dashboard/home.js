import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, BackHandler, RefreshControl } from 'react-native';
import { colors, fontSizes, hp, wp } from '../../../Helper';
import { CustomHeader, ProcessIndicator, CustomAlert2 } from '../../Common';
import AsyncStorage from '@react-native-community/async-storage';

let token = AsyncStorage.getItem('loginData')

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isAlertVisible: false,
            bottomViewHeight: -160,
            isBottomViewVisible: false,
            cuisineData: props && props.Cuisine && props.Cuisine.cuisineData && props.Cuisine.cuisineData.data || [],
            menuCategoryData: props && props.MenuCategory && props.MenuCategory.menuTypeData && props.MenuCategory.menuTypeData.data || [],
            forYouCategory: props && props.ForYouCategory && props.ForYouCategory.forYouTypeData && props.ForYouCategory.forYouTypeData.data || []
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton);
        this.isRefreshing = false
    }

    handleDeviceBackButton = () => {
        this.setState({isAlertVisible: true})
        return true;
    }

    componentDidMount() {
        token.then(res => this.loadData(JSON.parse(res).data[0].api_token))
    }

    loadData = (api_token = '') => {
        const { handleLocalAction, localActions, navigation } = this.props;
        this.isRefreshing = true
        handleLocalAction({ type: localActions.MENU_TYPE_DATA, data: {api_token: api_token} })
        handleLocalAction({ type: localActions.FOR_YOU_DATA, data: {api_token: api_token} })
        handleLocalAction({ type: localActions.CUISINE_DATA, data: {api_token: api_token} })
        this.isRefreshing = false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {forYouCategory, menuCategoryData, cuisineData} = this.state;

        if (nextProps.Cuisine && nextProps.Cuisine.cuisineData && JSON.stringify(cuisineData) !== JSON.stringify(nextProps.Cuisine.cuisineData)) {
            if(nextProps.Cuisine.cuisineData && nextProps.Cuisine.cuisineData.success) {
                this.setState({ cuisineData: nextProps.Cuisine.cuisineData.data })
            }
        }

        if (nextProps.MenuCategory && nextProps.MenuCategory.menuTypeData && JSON.stringify(menuCategoryData) !== JSON.stringify(nextProps.MenuCategory.menuTypeData)) {
            if(nextProps.MenuCategory.menuTypeData && nextProps.MenuCategory.menuTypeData.success) {
                this.setState({ menuCategoryData: nextProps.MenuCategory.menuTypeData.data })
            }
        }

        if(nextProps.ForYouCategory && nextProps.ForYouCategory.forYouTypeData && JSON.stringify(forYouCategory) !== JSON.stringify(nextProps.ForYouCategory.forYouTypeData)) {
            if(nextProps.ForYouCategory.forYouTypeData && nextProps.ForYouCategory.forYouTypeData.success) {
                this.setState({ forYouCategory: nextProps.ForYouCategory.forYouTypeData.data})
            }
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleAlertOk = () => {
        const {handleLocalAction, localActions, navigation} = this.props;
        this.setState({
            isAlertVisible: false
        }, () => {
            BackHandler.exitApp();
        })
    }

    renderCuisineItem = ({ item, index }) => {
        const { renderCuisineView } = styles
        return (
            <View key={index}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Dish', { displayKey: 'Cuisine', data: item, isEmpty: false })}
                    style={renderCuisineView}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: item.image || item.image_url }} />
                </TouchableOpacity>
                <Text style={{ marginVertical: wp(2) }}>{item.name || item.title}</Text>
            </View>
        )
    }

    renderItemForYou = ({ item, index }) => {
        const { renderCuisineView } = styles

        return (
            <View key={index}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Dish', { displayKey: 'ForYou', data: item, isEmpty: false })}
                    style={renderCuisineView}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{uri: item.image || item.image_url}} />
                </TouchableOpacity>
                <Text style={{ marginVertical: wp(2) }}>{item.title}</Text>
            </View>
        )
    }

    renderMenuSelection = ({ item, index }) => {
        const { renderCuisineView, textStyle } = styles
        return (
            <View style={{ backgroundColor: colors.OFFGREEN, paddingHorizontal: wp(3) }} key={index}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Dish', { displayKey: 'MenuSelection', isEmpty: true, data: item })}
                    style={[renderCuisineView, { height: hp(21), backgroundColor: colors.OFFGREEN }]}>
                    <View style={{ height: hp(17), width: hp(25), backgroundColor: colors.SILVER }}>
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            source={{ uri: item.image || item.image_url }}
                        />
                        <Text style={textStyle}>{item.name || item.type}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoading = () => {
        return (
            <View style={{ height: hp(16), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: colors.SILVER,
                    fontSize: fontSizes.large
                }}>{'Loading...'}</Text>
            </View>
        )
    }

    onRefresh = () => {
        token.then(res => this.loadData(JSON.parse(res).data[0].api_token))
    }

    render() {
        const { container, detailContainer, headerTextView, headerTextStyle, flatlistContainer } = styles;
        const { cuisineData, menuCategoryData, forYouCategory } = this.state;
        const { User } = this.props;
        const { processing } = User;
        return (
            <View style={container}>
                <ProcessIndicator color={colors.WHITE} isProcessing={processing} />
                <View style={container}>
                    <View style={{ height: hp(12), flexDirection: 'row' }}>
                        <CustomHeader
                            navigation={this.props.navigation}
                            isHome={true}
                            isDrawerIcon={true}
                            drawerwithSearch={true}
                        />
                    </View>

                    <View style={detailContainer} >
                        <View style={{ flex: 1, paddingHorizontal: hp(1) }}>
                            <ScrollView
                                autoscrollToTopThreshold={0.6}
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1 }}
                                refreshControl={<RefreshControl refreshing={this.isRefreshing} onRefresh={this.onRefresh} />}
                            >
                                <View style={headerTextView}>
                                    <Text style={headerTextStyle}>{'For you'}</Text>
                                </View>

                                <View style={flatlistContainer}>
                                {
                                        (forYouCategory && forYouCategory.length > 0) &&
                                        <FlatList
                                            data={forYouCategory}
                                            renderItem={this.renderItemForYou}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        /> || this.renderLoading()
                                    }
                                </View>

                                <View style={[headerTextView, { marginTop: wp(3) }]}>
                                    <Text style={headerTextStyle}>{'Menu Selection'}</Text>
                                </View>

                                <View style={flatlistContainer}>
                                    {
                                        (menuCategoryData && menuCategoryData.length > 0) &&
                                        <FlatList
                                            data={menuCategoryData}
                                            renderItem={this.renderMenuSelection}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        /> || this.renderLoading()
                                    }
                                </View>

                                <View style={[headerTextView, { marginTop: wp(3) }]}>
                                    <Text style={headerTextStyle}>{'Cuisine'}</Text>
                                </View>

                                <View style={flatlistContainer}>
                                    {
                                        (cuisineData && cuisineData.length > 0) &&
                                        <FlatList
                                            data={cuisineData}
                                            renderItem={this.renderCuisineItem}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        />
                                        || this.renderLoading()
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {
                    (this.state.isAlertVisible) &&
                    <CustomAlert2
                        isVisible={this.state.isAlertVisible}
                        onCancelClick={() => {
                            this.setState({isAlertVisible: false})
                        }}
                        onOtherBtnClick={this.handleAlertOk}
                        cancelBtnTitle={'No'}
                        otherBtnTitle={'Yes'}
                        modalTitle={'Exit'}
                        modalDesc={'Are you sure you want to exit from app or use app bacl button to back ?'}
                    />
                }
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
        overflow: 'hidden',
        paddingVertical: wp(3)
    },
    headerTextView: {
        height: hp(5),
        backgroundColor: colors.OFFGREEN,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextStyle: {
        color: colors.BLACK,
        fontSize: fontSizes.large,
        fontWeight: 'bold'
    },
    flatlistContainer: {
        paddingHorizontal: wp(3),
        paddingVertical: wp(3),
        backgroundColor: colors.OFFGREEN,
    },
    renderCuisineView: {
        height: hp(17),
        width: hp(25),
        borderRadius: wp(5),
        backgroundColor: 'gray',
        marginRight: wp(2),
        overflow: 'hidden'
    },
    textStyle: {
        color: colors.BLACK,
        marginVertical: hp(1),
        marginHorizontal: hp(0.5)
    }
})

export { Home }
