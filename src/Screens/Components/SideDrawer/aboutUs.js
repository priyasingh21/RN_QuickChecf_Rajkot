import React, { Component } from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView, BackHandler} from 'react-native';
import {boxShadow, colors, fontSizes, hp, outerBoxShadow, wp} from '../../../Helper'
import {CustomHeader} from "../../Common";

class AboutUs extends Component{
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
        return(
            <View style={{
                flex: 1 ,
                backgroundColor: colors.WHITE
            }}>
                <View style={{height: hp(11)}}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isBack={true}
                        titleText={'My Account'}
                        leftIcon={'md-back'}
                        isAboutUs={true}
                    />
                </View>

                <ScrollView style={{flex: 1, paddingBottom: wp(50)}} showsVerticalScrollIndicator={false}>
                    <View style={{ marginVertical: wp(5)}}>
                        <Text style={{
                            alignSelf: 'center',
                            color: colors.BLACK,
                            fontSize: fontSizes.xxlarge,
                            fontWeight: '600',
                        }}>{'Quick Chef is all about'}</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: colors.BLACK,
                            fontSize: fontSizes.xxlarge,
                            fontWeight: '600'
                        }}>{'authentic healthy home-'}</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: colors.BLACK,
                            fontSize: fontSizes.xxlarge,
                            fontWeight: '600'
                        }}>{'coked food and more ...'}</Text>
                    </View>

                    <View style={{
                        height: hp(35),
                        marginHorizontal: wp(5),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../../../assets/foodPlate.jpg')}/>
                    </View>

                    <View style={{
                        marginHorizontal: wp(5)
                    }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: colors.GRAY,
                            fontSize: fontSizes.mini,
                            lineHeight: wp(5.5),
                            marginVertical: wp(2)
                        }}>{'Quick Chef was create out of a simpleidea: what if you\ncould order locally prepared hole-cooked food and\nhave it delivered to your door whenever you wanted? Not\na take away or a restaurant or amarket stall, but a local\nchef, cooking for you in their home.'}</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: colors.GRAY,
                            fontSize: fontSizes.mini,
                            lineHeight: wp(5.5),
                            marginVertical: wp(2)
                        }}>{'Quick Chef was create out of a simpleidea: what if you\ncould order locally prepared hole-cooked food and\nhave it delivered to your door whenever you wanted? Not\na take away or a restaurant or amarket stall, but a local\nchef, cooking for you in their home.'}</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: colors.GRAY,
                            fontSize: fontSizes.mini,
                            lineHeight: wp(5.5),
                            marginVertical: wp(2)
                        }}>{'Quick Chef was create out of a simpleidea: what if you\ncould order locally prepared hole-cooked food and\nhave it delivered to your door whenever you wanted? Not\na take away or a restaurant or amarket stall, but a local\nchef, cooking for you in their home.'}</Text>


                        <Text style={{
                            alignSelf: 'center',
                            color: colors.GRAY,
                            fontSize: fontSizes.mini,
                            lineHeight: wp(5.5),
                            marginVertical: wp(2)
                        }}>{'Quick Chef was create out of a simpleidea: what if you\ncould order locally prepared hole-cooked food and\nhave it delivered to your door whenever you wanted? Not\na take away or a restaurant or amarket stall, but a local\nchef, cooking for you in their home.'}</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: colors.GRAY,
                            fontSize: fontSizes.mini,
                            lineHeight: wp(5.5),
                            marginVertical: wp(2)
                        }}>{'Quick Chef was create out of a simpleidea: what if you\ncould order locally prepared hole-cooked food and\nhave it delivered to your door whenever you wanted? Not\na take away or a restaurant or amarket stall, but a local\nchef, cooking for you in their home.'}</Text>

                    </View>

                </ScrollView>
            </View>
        )
    }
}

export { AboutUs }
