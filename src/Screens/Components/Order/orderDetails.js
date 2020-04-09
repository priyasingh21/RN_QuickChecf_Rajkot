import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes,
    boxShadow
} from '../../../Helper'
import { CustomHeader } from "../../Common";
// import Icon from 'react-native-vector-icons/AntDesign';

class OrderDetail extends Component {

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
        const { detailContainer, chefMenuView, chefMenuTextStyle } = styles;

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isOrderDetail={true}
                        titleText={'Order Detail'}
                        isBack={true}
                    />
                </View>

                <View style={detailContainer} >
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={() => this.props.navigation.navigate('Chat')}>
                            {/*<Icon*/}
                            {/*    name={'message1'}*/}
                            {/*    size={wp(10)}*/}
                            {/*    color={colors.APPGREEN}*/}
                            {/*/>*/}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APPGREEN,
    },
    detailContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        paddingHorizontal: wp(8),
        paddingVertical: wp(3)
    },
    profileImageView: {
        alignSelf: 'center',
        height: hp(15),
        width: hp(15),
        borderRadius: hp(15) / 2,
        marginTop: hp(6),
        borderColor: colors.BLACK,
        borderWidth: wp(0.1),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.APPBROWN,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    appButtonView: {
        alignSelf: 'center',
        marginVertical: wp(4)
    },
    chefMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3)
    },
    chefMenuView: {
        height: hp(8),
        width: hp(8),
        backgroundColor: colors.APPGREEN,
        borderRadius: hp(8) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chefMenuTextStyle: {
        fontWeight: 'bold',
        color: colors.WHITE,
        fontSize: fontSizes.largel
    }
})
export { OrderDetail }
