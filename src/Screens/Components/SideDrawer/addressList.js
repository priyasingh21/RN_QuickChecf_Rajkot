import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes
} from '../../../Helper'
import { CustomHeader, AppButton } from "../../Common";
// import Icon from 'react-native-vector-icons/Ionicons';

class AddressList extends Component {

    constructor(props) {
        super(props)
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    renderData = ({ item, index }) => {
        const { address_line1, address_line2, city, state, state_abbr, zipCode, country, area, address_type } = item;
        const { addressRowContainer, addressText } = styles;
        return (
            <View style={addressRowContainer} key={index}>
                <Text style={addressText}>
                    {`${address_type}\n${address_line1} ${address_line2}\n${area}${city}, ${state_abbr}-${zipCode}\n${country}`}
                </Text>
                {/*<Icon name={'ios-arrow-forward'} color={colors.GRAY} size={wp(4)} />*/}
            </View>
        )
    }

    itemSeparatorComponent = () => {
        const { separatorStyle } = styles;
        return (
            <View style={separatorStyle} />
        )
    }

    render() {
        const { detailContainer, flatListStyle, addAddressContainer, addAddressText } = styles;
        const addressData = [{
            address_type: 'Home',
            address_line1: '123/PL No 23',
            address_line2: 'GHB',
            area: 'Amba Nagar-1',
            city: 'Rajkot',
            state: 'Gujarat',
            state_abbr: 'GJ',
            zipCode: '65123',
            country: 'India'
        },
        {
            address_type: 'Work',
            address_line1: '123/PL No 23',
            address_line2: 'GHB',
            area: 'Amba Nagar-1',
            city: 'Rajkot',
            state: 'Gujarat',
            state_abbr: 'GJ',
            zipCode: '65123',
            country: 'India'
        }];

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isAddressList={true}
                        titleText={'Select Address'}
                        isBack={true}
                    />
                </View>

                <View style={detailContainer} >
                    {
                        (addressData && addressData.length > 0) &&
                        <FlatList
                            style={[flatListStyle, { backgroundColor: 'transparent' }]}
                            data={addressData}
                            renderItem={this.renderData}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={this.itemSeparatorComponent}
                        />
                    }

                    <AppButton
                        styleBtn={{ alignSelf: 'center' }}
                        buttonText={'Add New Address'}
                        textColor={colors.WHITE}
                        backgroundColor={colors.SKYBLUE}
                        onBtnPress={() => this.props.navigation.navigate('AddAddress')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addressRowContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: wp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressText: {
        color: colors.GRAY,
        fontSize: fontSizes.medium
    },
    separatorStyle: {
        height: wp(0.3),
        width: '100%',
        backgroundColor: colors.LIGHTGRAY,
        marginVertical: wp(3)
    },
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    flatListStyle: {
        flex: 1,
        paddingBottom: hp(1),
        paddingHorizontal: wp(3),
        paddingTop: wp(3),
        marginTop: wp(5)
    },
    addAddressContainer: {
        padding: wp(3),
        marginVertical: wp(5),
        backgroundColor: colors.SKYBLUE,
        marginHorizontal: wp(4)
    },
    addAddressText: {
        color: colors.WHITE,
        fontSize: fontSizes.largel,
        alignSelf: 'center'
    }
})
export { AddressList }
