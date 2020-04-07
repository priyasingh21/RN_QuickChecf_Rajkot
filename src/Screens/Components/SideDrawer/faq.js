import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, FlatList,
    BackHandler
} from 'react-native';
import { hp, colors, wp, fontSizes, boxShadow } from "../../../Helper";
import { CustomHeader } from "../../Common";

class Faq extends Component {

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
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isFaq={true}
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
                        alignSelf: 'flex-start',
                        fontSize: fontSizes.xxlarge,
                        fontWeight: 'bold'
                    }}>{'FAQ'}</Text>

                    <View style={{
                        flex: 1,
                        backgroundColor: colors.WHITE,
                        marginTop: wp(3),
                        borderRadius: wp(6),
                        ...boxShadow,
                        paddingVertical: wp(3)
                    }}>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: wp(3),
                                paddingVertical: wp(7)
                            }}>
                                <Text style={{
                                    color: colors.BLACK,
                                    fontWeight: 'bold',
                                    fontSize: fontSizes.xxmedium
                                }}>{'Answers for QuickChefDiners!'}</Text>

                                <View style={{
                                    height: wp(10),
                                    marginVertical: wp(2),
                                    marginHorizontal: wp(3),
                                    borderBottomColor: colors.BLACK,
                                    borderBottomWidth: wp(0.2),
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text style={{
                                        color: colors.BLACK,
                                        fontWeight: 'bold',
                                    }}>{'How does Quick Chef Works!'}</Text>

                                </View>

                                <View style={{
                                    marginHorizontal: wp(3),
                                    alignItems: 'flex-start',
                                }}>
                                    <Text style={{
                                        color: colors.DARKGRAY,
                                        fontWeight: 'normal'
                                    }}>{'"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service. "Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service'}</Text>
                                    <Text style={{
                                        color: colors.DARKGRAY,
                                        fontWeight: 'normal'
                                    }}>{'"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service. "Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service'}</Text>
                                    <Text style={{
                                        color: colors.DARKGRAY,
                                        fontWeight: 'normal'
                                    }}>{'"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service. "Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service'}</Text>
                                    <Text style={{
                                        color: colors.DARKGRAY,
                                        fontWeight: 'normal'
                                    }}>{'"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service. "Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service"Use" or "Using" means to access,view, download, upload, or any otherlegal use or otherwise benefit fromusing the Quick Chef Service'}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

export { Faq }
