import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, wp, fontSizes, boxShadow } from '../../Helper';
import Icon from 'react-native-vector-icons/Ionicons';

class AppButton extends Component {

    render() {
        const { iconTitle, iconColor, buttonText, backgroundColor, textColor, isImage, onBtnPress, styleBtn } = this.props;
        const { container, titleText } = styles;
        return(
            <TouchableOpacity onPress={onBtnPress} style={[container, {backgroundColor: backgroundColor && backgroundColor ||colors.WHITE}, styleBtn && styleBtn]}>
                {
                    (isImage) && <Image
                        source={require('../../../assets/googleLogo.png')}
                        style={{height: wp(5), width: wp(5)}}
                    />
                    || <Icon
                        name={iconTitle && iconTitle || ''}
                        size={wp(9)}
                        color={iconColor && iconColor || colors.RED}
                    />
                }
                <Text style={[titleText,{color: textColor && textColor || colors.BLACK,}]}>
                    {buttonText && buttonText || 'Sign in with Google'}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp(60),
        height: wp(14),
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        marginVertical: wp(2),
        ...boxShadow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        marginHorizontal: wp(5),
        fontSize: fontSizes.xmedium
    }
});

export { AppButton };
