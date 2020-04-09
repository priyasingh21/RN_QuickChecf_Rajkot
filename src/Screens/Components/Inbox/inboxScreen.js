import React, { Component } from 'react';
import {View, Text, Image, FlatList, BackHandler} from 'react-native';
import {colors, hp, wp, boxShadow, outerBoxShadow, fontSizes, SCREEN_HEIGHT} from '../../../Helper'
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppButton, CustomHeader} from "../../Common";

const inboxData=[{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
}]


class InboxScreen extends Component{

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

    renderInboxData = ({item}) => {
        return (
            <View style={{
                height: hp(13),
                backgroundColor: colors.OFFGREEN,
                ...boxShadow,
                borderRadius: wp(5),
                marginBottom: wp(2),
                padding: wp(3),
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRightWidth: wp(0.5),
                        borderColor: colors.SILVER
                    }}>
                        <Icon name={'user'} size={wp(5)} color={colors.APPBROWN} />
                    </View>

                    <View style={{
                        flex: 4,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingHorizontal: wp(2)
                    }}>
                        <Text>{item.title}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon name={'chevron-right'} size={wp(4)} color={colors.BLACK} />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={{
                flex: 1 ,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{height: hp(11)}}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isInbox={true}
                        titleText={'Inbox'}
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
                }} >

                    <FlatList
                        style={{
                            flex: 1
                        }}
                        data={inboxData}
                        renderItem={this.renderInboxData}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: wp(5)
                    }}>
                        <AppButton
                            textColor={colors.WHITE}
                            backgroundColor={colors.BLOODYRED}
                            buttonText={'Delete All'}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

export { InboxScreen }
