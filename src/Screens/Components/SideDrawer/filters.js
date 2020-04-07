import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes,
    forYouData,
    menuData,
    deliveryData,
    distanceData,
    menuClassificationData
} from '../../../Helper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppButton, CustomHeader } from "../../Common";
import { cuisineCountry, portionSize, markers, spicyMenu, menuAvailibility } from "../../../Helper";

class Filters extends Component {

    constructor(props) {
        super(props)
        this.state = {
            KeywordSearch: '',
            forYouType: 'highest rated',
            menuClassificationType: 'veg',
            menuType: 'all',
            deliveryType: 'delivery',
            distanceType: 'all',
            tempCuisine: cuisineCountry,
            tempPortionSize: portionSize,
            tempMarkers: markers,
            tempSpicyMenu: spicyMenu,
            tempMenuAvail: menuAvailibility,
            menusCount: 138
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    onChangeValuye = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    renderItem = (item, index, type, key) => {
        return (
            <View key={index} style={{ flexDirection: 'row', flex: 1, marginVertical: wp(1) }}>
                <TouchableOpacity
                    onPress={() => this.onChangeValuye(key, item.toLowerCase())}
                    style={{
                        height: wp(5),
                        width: wp(5),
                        borderRadius: wp(5) / 2,
                        borderWidth: wp(0.3),
                        borderColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.GRAY,
                        marginRight: wp(3),
                        justifyContent: 'center',
                    }}
                >
                    <View style={{
                        height: wp(3),
                        width: wp(3),
                        borderRadius: wp(3) / 2,
                        borderWidth: wp(0.1),
                        borderColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.TRANSPARENT,
                        backgroundColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.TRANSPARENT,
                        alignSelf: 'center'
                    }} />
                </TouchableOpacity>
                <Text>{item}</Text>
            </View>
        )
    }

    toggleCheckbox = (item, index, type) => {
        let newSelectedValue = !item.selected
        type[index].selected = newSelectedValue
        this.setState({
            [type]: [...type]
        })
    }

    renderCheckBoxes = (item, index, type) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: wp(1) }}>
                <Icon
                    name={(item.selected) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={wp(7)}
                    color={(item.selected) ? colors.APPGREEN : colors.GRAY}
                    onPress={() => this.toggleCheckbox(item, index, type)}
                />
                <Text style={{ alignSelf: 'center', marginLeft: wp(2) }}>{item.title}</Text>
            </View>
        )
    }

    getAllFilterData = () => {
        const { tempSpicyMenu, forYouType, menuType, menuClassificationType, distanceType, deliveryType, tempCuisine, tempPortionSize, tempMarkers, tempMenuAvail } = this.state;
        let selectedCuisine = tempCuisine.filter(data => data.selected);
        let selectedPortion = tempPortionSize.filter(data => data.selected);
        let selectedMarkers = tempMarkers.filter(data => data.selected);
        let selectedSpicyMenu = tempSpicyMenu.filter(data => data.selected);
        let selectedMenuAvail = tempMenuAvail.filter(data => data.selected);
       
        let filter = {
            forYouType,
            menuType,
            menuClassificationType,
            deliveryType,
            distanceType,
            selectedCuisine,
            selectedMarkers,
            selectedPortion,
            selectedSpicyMenu,
            selectedMenuAvail
        }

    }

    render() {
        const { tempSpicyMenu, forYouType, menuType, menuClassificationType, distanceType, deliveryType, tempCuisine, tempPortionSize, tempMarkers, tempMenuAvail } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isFilters={true}
                        titleText={'Filters'}
                        isBack={true}
                    />
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: colors.WHITE,
                    borderTopLeftRadius: wp(5),
                    borderTopRightRadius: wp(5),
                }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            paddingVertical: wp(4),
                            paddingHorizontal: wp(2)
                        }}>
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Keyword Search'}</Text>
                                <TextInput
                                    style={{
                                        marginVertical: wp(2),
                                        borderWidth: wp(0.1),
                                        borderColor: colors.SILVER,
                                        paddingHorizontal: wp(3)
                                    }}
                                    onChangeText={(text) => this.onChangeValuye('KeywordSearch', text)}
                                />
                            </View>

                            {/*For You*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'For You'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={forYouData}
                                        renderItem={({ item, index }) => this.renderItem(item, index, forYouType, 'forYouType')}
                                    />
                                </View>

                            </View>

                            {/*Menu*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={menuData}
                                        numColumns={2}
                                        renderItem={({ item, index }) => this.renderItem(item, index, menuType, 'menuType')}
                                    />
                                </View>

                            </View>

                            {/*Delivery*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Delivery'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={deliveryData}
                                        renderItem={({ item, index }) => this.renderItem(item, index, deliveryType, 'deliveryType')}
                                    />
                                </View>

                            </View>

                            {/*Distance*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Distance'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={distanceData}
                                        numColumns={2}
                                        renderItem={({ item, index }) => this.renderItem(item, index, distanceType, 'distanceType')}
                                    />
                                </View>
                            </View>

                            {/*Cuisine*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Cuisines'}</Text>

                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempCuisine}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempCuisine)}
                                        numColumns={2}
                                    />
                                </View>
                            </View>

                            {/*Portion Size*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Portion Size'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempPortionSize}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempPortionSize)}
                                        numColumns={2}
                                    />
                                </View>
                            </View>

                            {/*Menu Classification*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Classification'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={menuClassificationData}
                                        numColumns={2}
                                        renderItem={({ item, index }) => this.renderItem(item, index, menuClassificationType, 'menuClassificationType')}
                                    />
                                </View>
                            </View>

                            {/*Markers*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Markers'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempMarkers}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempMarkers)}
                                        numColumns={2}
                                    />
                                </View>

                            </View>

                            {/*Spicy*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Spicy'}</Text>

                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempSpicyMenu}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempSpicyMenu)}
                                        numColumns={2}
                                    />
                                </View>
                            </View>

                            {/*Menu Available on*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Available on'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempMenuAvail}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempMenuAvail)}
                                        numColumns={3}
                                    />
                                </View>
                            </View>

                        </View>
                    </ScrollView>

                    <AppButton
                        buttonText={'Enjoy ' + this.state.menusCount + ' menus'}
                        textColor={colors.WHITE}
                        backgroundColor={colors.APPGREEN}
                        styleBtn={{ alignSelf: 'center' }}
                        onBtnPress={this.getAllFilterData}
                    />

                </View>
            </View>
        )
    }
}

export { Filters }
