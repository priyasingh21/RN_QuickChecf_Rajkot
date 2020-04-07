import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes
} from '../../../Helper'
import { CustomHeader, CustomTextInput, SmallAppButton } from "../../Common";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class AddAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locationType: 'no',
            address_type: 'home',
            address_line_1: '',
            address_line_2: '',
            area: '',
            city: '',
            state: '',
            country: '',
            zipcode: ''
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
            <View key={index} style={{ flexDirection: 'row', flex: 1, marginVertical: wp(4) }}>
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

    onSubmit = () => {

    }

    render() {
        const { detailContainer, textStyle, textInputStyle } = styles;
        const { locationType, address_type } = this.state;

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isAddAddress={true}
                        titleText={'Add Address'}
                        isBack={true}
                    />
                </View>

                <View style={detailContainer} >
                    <View style={{ flex: 0.4 }}>
                        <MapView
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    </View>

                    <View style={{ flex: 0.6, padding: wp(5) }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                            <View>
                                <Text style={textStyle}>{'Use your current location'}</Text>
                                <FlatList
                                    data={['Yes', 'No']}
                                    numColumns={2}
                                    renderItem={({ item, index }) => this.renderItem(item, index, locationType, 'locationType')}
                                />
                            </View>

                            <View>
                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'Address Line 1'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'address_line_1')}
                                    isMultiline={true}
                                />

                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'Address Line 2'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'address_line_2')}
                                    isMultiline={true}
                                />

                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'Area'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'area')}
                                    isMultiline={true}
                                />


                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'City'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'City')}
                                    isMultiline={true}
                                />


                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'State'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'state')}
                                    isMultiline={true}
                                />

                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'Country'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'country')}
                                    isMultiline={true}
                                />

                                <CustomTextInput
                                    textInputOuterViewStyle={textInputStyle}
                                    placeHolderText={'Zip Code'}
                                    placeHolderColor={colors.GRAY}
                                    onChangeText={(value) => this.onChangeValuye(value, 'zipcode')}
                                    isMultiline={true}
                                />

                                <View>
                                    <Text style={textStyle}>{'Address Type'}</Text>
                                    <FlatList
                                        data={['Home', 'Work', 'Other']}
                                        numColumns={3}
                                        renderItem={({ item, index }) => this.renderItem(item, index, address_type, 'address_types')}
                                    />
                                </View>
                            </View>
                            <SmallAppButton
                                btnStyle={{ width: wp(65) }}
                                onPress={this.onSubmit}
                                btnTitle={'Submit'}
                            />

                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.DARKGRAY,
        fontSize: fontSizes.medium
    },
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    textInputStyle: {
        height: hp(5),
        backgroundColor: colors.OFFGREEN
    }
})
export { AddAddress }
