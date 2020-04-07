import React, { Component } from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { colors, wp, fontSizes, boxShadow } from '../../Helper';

class SmallAppButton extends Component {

    render() {
        const { onPress, btnTitle, btnStyle } = this.props;
        const { btnContainer, btnText } = styles;
        return(
            <TouchableOpacity
                style={[btnContainer, btnStyle && btnStyle]}
                onPress={onPress}>

                <Text style={btnText}>{btnTitle && btnTitle || ''}</Text>
            </TouchableOpacity>
        );
    }
}

const styles= StyleSheet.create({
    btnContainer: {
        backgroundColor: colors.APPGREEN,
        padding: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wp(10),
        borderRadius: wp(2),
        ...boxShadow,
        width: wp(20)
    },
    btnText: {
        color: colors.WHITE,
        fontSize: fontSizes.xsmall,
        fontWeight: 'bold'
    }
})
export { SmallAppButton };
