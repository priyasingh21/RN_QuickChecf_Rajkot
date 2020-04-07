import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, FlatList, BackHandler
} from 'react-native';
import {hp, colors, wp, fontSizes, boxShadow} from "../../../Helper";
import {CustomHeader} from "../../Common";

class Feedback extends Component {

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

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }} >
                <View style={{height: hp(11)}}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isFeedback={true}
                        isBack={true}
                    />
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: colors.WHITE,
                    borderTopLeftRadius: wp(5),
                    borderTopRightRadius: wp(5),
                    paddingHorizontal: wp(8),
                    paddingVertical: wp(8)
                }}>
                    <View style={{
                        marginVertical: wp(6),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.BLACK,
                            fontWeight: 'bold',
                            fontSize: fontSizes.large
                        }}>{'Enjoying Quick Chef ?'}</Text>
                    </View>

                    <View style={{
                        flex: 0.2,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.BLOODYRED,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(6),
                            padding: wp(3),
                            ...boxShadow,
                            borderRadius: wp(3)
                        }}>
                            <Text>{'Not really'}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: colors.APPGREEN,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(6),
                            padding: wp(3),
                            ...boxShadow,
                            borderRadius: wp(3)
                        }}>
                            <Text>{'Yes!'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export {Feedback}
