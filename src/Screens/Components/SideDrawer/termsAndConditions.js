import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, FlatList, BackHandler
} from 'react-native';
import {hp, colors, wp, fontSizes, boxShadow} from "../../../Helper";
import {CustomHeader} from "../../Common";

class TermsAndConditions extends Component {

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
                                isTermsAndConditions={true}
                                isBack={true}
                            />
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: colors.OFFGREEN,
                            borderTopLeftRadius: wp(5),
                            borderTopRightRadius: wp(5),
                            paddingHorizontal: wp(8),
                            paddingVertical: wp(8)
                        }} >
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: fontSizes.largel,
                                fontWeight: 'bold'
                            }}>{'Terms And Conditions'}</Text>

                            <View style={{
                                flex: 1,
                                backgroundColor: colors.WHITE,
                                marginTop: wp(3),
                                borderRadius: wp(6),
                                ...boxShadow
                            }}>
                                <ScrollView style={{flex: 1, paddingBottom: wp(3)}} showsVerticalScrollIndicator={false}>
                                    <View style={{
                                        flex: 1,
                                        paddingHorizontal: wp(3),
                                        paddingVertical: wp(7)
                                    }}>
                                        <Text style={{
                                            color: colors.GRAY,
                                            fontSize: fontSizes.xsmall,
                                            alignSelf: 'center'
                                        }}>{'This TERMS OF USE is made by Quick Chef Private\nLtd., a company registered under the Indian\nCompanies Act, 2013 having its registered office\nat Module 406-A,Fourth Floor,Thejaswini,\nTechnopark,Trivandrum-695581,Kerala, India.\n(hereinafter referred to as “Quick Chef”) and you as\na User of the Quick Chef Service.'}</Text>

                                        <View style={{
                                            height: wp(10),
                                            marginVertical: wp(3),
                                            marginHorizontal: wp(3),
                                            borderBottomColor: colors.BLACK,
                                            borderBottomWidth: wp(0.2),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Text style={{
                                                color: colors.BLACK,
                                                fontWeight: 'bold'
                                            }}>{'1. DEFINITIONS'}</Text>

                                        </View>

                                        <View style={{
                                            marginHorizontal: wp(8),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row'
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'1. "Use" or "Using" means to access,\nview, download, upload, or any other\nlegal use or otherwise benefit from\nusing the Quick Chef Service'}</Text>
                                        </View>


                                        <View style={{
                                            marginHorizontal: wp(8),
                                            marginTop: wp(1),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row'
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'2. "User" or "you" means any person\nwho accesses or uses the Quick Chef\nService for his own purpose or on\nbehalf of someone else and includes\nany legal entity.'}</Text>
                                        </View>


                                        <View style={{
                                            marginHorizontal: wp(8),
                                            marginTop: wp(1),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'3."User\'s Content" means any content,\nincluding any text, data, information or\nother material, that you may upload,\ntransmit or store using the\nfunctionality of the Quick Chef Service.'}</Text>
                                        </View>

                                        <View style={{
                                            marginHorizontal: wp(8),
                                            marginTop: wp(1),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'4. "User" or "you" means any person\nwho accesses or uses the Quick Chef\nService for his own purpose or on\nbehalf of someone else and includes\nany legal entity.'}</Text>
                                        </View>

                                        <View style={{
                                            marginHorizontal: wp(8),
                                            marginTop: wp(1),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'5. "User" or "you" means any person\nwho accesses or uses the Quick Chef\nService for his own purpose or on\nbehalf of someone else and includes\nany legal entity.'}</Text>
                                        </View>

                                        <View style={{
                                            marginHorizontal: wp(8),
                                            marginTop: wp(1),
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                        }}>
                                            <Text>{'\u2022 \t\t'}</Text>
                                            <Text style={{
                                                color: colors.DARKGRAY,
                                                fontWeight: 'normal'
                                            }}>{'6. "User" or "you" means any person\nwho accesses or uses the Quick Chef\nService for his own purpose or on\nbehalf of someone else and includes\nany legal entity.'}</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
        );
    }
}

export {TermsAndConditions}
