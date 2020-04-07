import React, {Component} from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import {colors, hp, wp} from '../../../Helper'

class Loader extends Component{
    render() {
        return (
                <View style={{
                    top: 0,
                    bottom: 0,
                    height: hp(100),
                    width: wp(100),
                    backgroundColor: colors.BLACKTRANSPARENT,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator
                        animating
                        color={colors.GRAY}
                        size={hp(5)}
                    />
                </View>
        );
    }
}

export {Loader}
