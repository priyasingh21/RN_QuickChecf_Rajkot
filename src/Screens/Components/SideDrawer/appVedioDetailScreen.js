import React, { Component } from 'react';
import {FlatList, Text, View, BackHandler} from 'react-native';
import {boxShadow, colors, fontSizes, hp, outerBoxShadow, wp} from '../../../Helper'
import {AppButton, CustomHeader} from "../../Common";
// import Icon from "react-native-vector-icons/FontAwesome";

const videoData = [{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
},{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
},{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
},{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
},{
    title: 'Your food (Spicy Noodle)\nwas arrived!!'
}, {
    title: 'You get on promo code!!'
},];

class AppVedioDetailScreen extends Component{

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

    renderData = ({item}) => {
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
                        {/*<Icon name={'user'} size={wp(5)} color={colors.APPBROWN} />*/}
                    </View>

                    <View style={{
                        flex: 4,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingHorizontal: wp(2)
                    }}>
                        {/*<Video*/}
                        {/*    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}*/}
                        {/*    rate={1.0}*/}
                        {/*    volume={1.0}*/}
                        {/*    isMuted={false}*/}
                        {/*    resizeMode="cover"*/}
                        {/*    shouldPlay={false}*/}
                        {/*    isLooping={false}*/}
                        {/*    style={{ width: '100%', height: '100%' }}*/}
                        {/*    useNativeControls={true}*/}
                        {/*/>*/}
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/*<Icon name={'chevron-right'} size={wp(4)} color={colors.BLACK} />*/}
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={{
                flex: 1 ,
                backgroundColor: colors.APPGREEN
            }}>
                <View style={{height: hp(11)}}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isBack={true}
                        leftIcon={'md-back'}
                        isVideoDetailScreen={true}
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
                        data={videoData}
                        renderItem={this.renderData}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }
}

export { AppVedioDetailScreen }
