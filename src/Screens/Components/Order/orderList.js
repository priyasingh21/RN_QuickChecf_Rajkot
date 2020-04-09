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

class OrderList extends Component {

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
        const { customer_name, qty, area } = item;
        const { addressRowContainer, addressText } = styles;
        return (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OrderDetails')}
             style={addressRowContainer} key={index}>
                <Text style={addressText}>
                    {`Name: ${customer_name}\nQuantity: ${qty}\nPlace: ${area}`}
                </Text>
                {/*<Icon name={'ios-arrow-forward'} color={colors.GRAY} size={wp(4)} />*/}
            </TouchableOpacity>
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
        const orderData = [{
            customer_name: 'Abhishek',
            qty: 5,
            area: 'Surat'
        },
        {
            customer_name: 'Radha',
            qty: 1,
            area: 'Varoda'
        }];

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isOrderList={true}
                        titleText={'My Orders'}
                        isBack={true}
                    />
                </View>

                <View style={detailContainer} >
                    {
                        (orderData && orderData.length > 0) &&
                        <FlatList
                            style={[flatListStyle, { backgroundColor: 'transparent' }]}
                            data={orderData}
                            renderItem={this.renderData}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={this.itemSeparatorComponent}
                        />
                    }
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
export { OrderList }
