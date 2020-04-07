import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes
} from '../../../Helper'
import { CustomHeader } from "../../Common";

class Chat extends Component {

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
                        isChat={true}
                        isBack={true}
                        titleText={'Chat with Customer'}
                    />
                </View>

                <View style={detailContainer} >
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    }
})
export { Chat }
