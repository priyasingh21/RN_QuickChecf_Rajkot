import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes
} from '../../../Helper'
import { CustomHeader, SmallAppButton } from "../../Common";
// import Icon from 'react-native-vector-icons/AntDesign';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

class OrderStatusMap extends Component {

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

    onSubmit = () => {

    }

    render() {
        const { detailContainer, textStyle } = styles;

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isOrderStatusMap={true}
                        titleText={'Order Status'}
                        isBack={true}
                    />
                </View>

                <View style={detailContainer} >
                    <View style={{
                        flex: 2,
                        flexDirection: 'row',
                        paddingHorizontal: wp(3),
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                alignSelf: 'center',
                                height: hp(8),
                                width: hp(8),
                                borderRadius: hp(8) / 2,
                                borderColor: colors.BLACK,
                                borderWidth: wp(0.1),
                                overflow: 'hidden',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={{ uri: 'http://magickalgraphics.com/Graphics/Miscellaneous/Flowers/flowers136.jpg' }}
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </View>

                            <View style={{
                                alignSelf: 'center',
                                marginHorizontal: wp(3)
                            }}>
                                <Text style={textStyle}>{'Peter Cosuine\n3.5 km'}</Text>
                            </View>

                        </View>

                        <View style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                            height: hp(4),
                            width: hp(8),
                            borderRadius: 3,
                            borderColor: colors.BLACK,
                            borderWidth: wp(0.3),
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {/*<Icon*/}
                            {/*    name={'star'}*/}
                            {/*    size={wp(3.5)}*/}
                            {/*    color={colors.STARYELLOW}*/}
                            {/*/>*/}
                            <Text style={textStyle}>{'4.5'}</Text>

                        </View>
                    </View>

                    <View style={{
                        flex: 4,
                        marginHorizontal: wp(5),
                        borderWidth: wp(0.3),
                        borderColor: colors.GRAY,
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}>
                        {/* <MapView
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <MapViewDirections
                                origin={{latitude: 37.3318456, longitude: -122.0296002}}
                                destination={{latitude: 37.771707, longitude: -122.4053769}}
                                strokeWidth={3}
                                strokeColor="hotpink"
                                // apikey={GOOGLE_MAPS_APIKEY}
                            />
                        </MapView>
                    */}
                        <MapView
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 37.7725259,
                                longitude: -122.4351431,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >

                            <MapView.Marker
                                coordinate={{latitude: 37.78825, longitude: -122.4324}}
                                title={"locaition"}
                                description={"test123"}
                            />

                            <Polyline
                                coordinates={[
                                    { latitude: 37.7725259, longitude: -122.4351431 },
                                    { latitude: 37.7896386, longitude: -122.421646 },
                                    { latitude: 37.7734153, longitude: -122.4577787 },
                                    { latitude: 37.7948605, longitude: -122.4596065 },
                                    { latitude: 37.8025845, longitude: -122.4351898 },
                                    { latitude: 37.8125259, longitude: -122.4251431 },
                                    { latitude: 37.8125259, longitude: -122.4751431 },

                                ]}
                                strokeColor={colors.SKYBLUE}
                                strokeColors={[
                                    colors.BLOODYRED,
                                    colors.APPGREEN, // no color, creates a "long" gradient between the previous and next coordinate
                                    colors.BURNTORANGE,
                                    colors.LIGHTRED,
                                    colors.LIGHTBRIGHTGREEN,
                                    colors.MARINER
                                ]}
                                strokeWidth={3}
                            />
                        </MapView>
                    </View>

                    <View style={{ padding: wp(5), flex: 6 }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={textStyle}>{'1x Spicy Noodle'}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {/*<Icon1*/}
                                    {/*    name={'currency-inr'}*/}
                                    {/*    size={wp(3.5)}*/}
                                    {/*    color={colors.BLACK}*/}
                                    {/*/>*/}
                                    <Text style={[textStyle]}>{'30'}</Text>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: wp(1)
                            }}>
                                <Text style={textStyle}>{'Delivery'}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {/*<Icon1*/}
                                    {/*    name={'currency-inr'}*/}
                                    {/*    size={wp(3.5)}*/}
                                    {/*    color={colors.BLACK}*/}
                                    {/*    size={wp(4)}*/}
                                    {/*/>*/}
                                    <Text style={[textStyle]}>{'10'}</Text>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: wp(3)
                            }}>
                                <Text style={textStyle}>{'Discount'}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[textStyle]}>{'-'}</Text>
                                    {/*<Icon1*/}
                                    {/*    name={'currency-inr'}*/}
                                    {/*    size={wp(3.5)}*/}
                                    {/*    color={colors.BLACK}*/}
                                    {/*/>*/}
                                    <Text style={[textStyle]}>{'5'}</Text>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: wp(4)
                            }}>
                                <Text style={textStyle}>{'Total'}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {/*<Icon1*/}
                                    {/*    name={'currency-inr'}*/}
                                    {/*    size={wp(3.5)}*/}
                                    {/*    color={colors.BLACK}*/}
                                    {/*/>*/}
                                    <Text style={[textStyle]}>{'35'}</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={[textStyle, { color: colors.BLACK, marginTop: wp(5) }]}>{'Status'}</Text>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        alignSelf: 'center',
                                        height: hp(4.5),
                                        width: hp(4.5),
                                        borderRadius: hp(4.5) / 2,
                                        borderColor: colors.BLACK,
                                        borderWidth: wp(0.1),
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.OFFGREEN
                                    }}>
                                        {/*<Icon*/}
                                        {/*    name={'star'}*/}
                                        {/*    color={colors.APPBROWN}*/}
                                        {/*    size={hp(2.5)}*/}
                                        {/*/>*/}
                                    </View>

                                    <View style={{
                                        alignSelf: 'center',
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={textStyle}>{'Order Cancelled'}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: wp(1)
                                }}>
                                    <View style={{
                                        alignSelf: 'center',
                                        height: hp(4.5),
                                        width: hp(4.5),
                                        borderRadius: hp(4.5) / 2,
                                        borderColor: colors.BLACK,
                                        borderWidth: wp(0.1),
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.OFFGREEN
                                    }}>
                                        {/*<Icon*/}
                                        {/*    name={'star'}*/}
                                        {/*    color={colors.APPBROWN}*/}
                                        {/*    size={hp(2.5)}*/}
                                        {/*/>*/}
                                    </View>

                                    <View style={{
                                        alignSelf: 'center',
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={textStyle}>{'Food Cooked'}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: wp(1),
                                    marginHorizontal: wp(8)
                                }}>
                                    <View style={{
                                        alignSelf: 'center',
                                        height: hp(4.5),
                                        width: hp(4.5),
                                        borderRadius: hp(4.5) / 2,
                                        borderColor: colors.BLACK,
                                        borderWidth: wp(0.1),
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.OFFGREEN
                                    }}>
                                        {/*<Icon*/}
                                        {/*    name={'star'}*/}
                                        {/*    color={colors.APPGREEN}*/}
                                        {/*    size={hp(2.5)}*/}
                                        {/*/>*/}
                                    </View>

                                    <View style={{
                                        alignSelf: 'center',
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={textStyle}>{'Order Delivering'}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: wp(1)
                                }}>
                                    <View style={{
                                        alignSelf: 'center',
                                        height: hp(4.5),
                                        width: hp(4.5),
                                        borderRadius: hp(4.5) / 2,
                                        borderColor: colors.BLACK,
                                        borderWidth: wp(0.1),
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.LIGHTGRAY
                                    }}>
                                        {/*<Icon*/}
                                        {/*    name={'star'}*/}
                                        {/*    color={colors.APPBROWN}*/}
                                        {/*    size={hp(2.5)}*/}
                                        {/*/>*/}
                                    </View>

                                    <View style={{
                                        alignSelf: 'center',
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={[textStyle, { color: colors.SILVER }]}>{'Order Arrive'}</Text>
                                    </View>
                                </View>

                            </View>

                            <SmallAppButton
                                btnStyle={{ width: wp(65), backgroundColor: colors.SILVER }}
                                onPress={this.onSubmit}
                                btnTitle={'Cancel Boorking'}
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
export { OrderStatusMap }
