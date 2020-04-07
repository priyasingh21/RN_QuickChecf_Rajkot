import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors, hp, wp} from "../../Helper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OcticonsIcon from 'react-native-vector-icons/Octicons'

class CustomTextInput extends Component{

    render() {
        const {textInputOuterViewStyle, iconFileName, iconName, placeHolderText, onChangeText, secureText, keyboardType,
            placeHolderColor, isMultiline, maxLength} = this.props;
        const {container, iconView, textInputContainer, textInputStyle} = styles;
        return(
            <View style={[container, textInputOuterViewStyle]}>
                {
                    (iconFileName) && <View style={iconView}>
                        {
                            (iconFileName === 'FontAwesomeIcon') && <FontAwesomeIcon
                                name={iconName && iconName}
                                color={colors.LIGHTGRAY}
                                size={wp(6)}
                            />
                            || (iconFileName === 'MaterialCommunityIconsIcon') && <MaterialCommunityIconsIcon
                                name={iconName && iconName}
                                color={colors.LIGHTGRAY}
                                size={wp(6)}
                            />
                            || (iconFileName === 'OcticonsIcon') && <OcticonsIcon
                                name={iconName && iconName}
                                color={colors.LIGHTGRAY}
                                size={wp(6)}
                            />
                        }
                    </View>
                }

                <View style={textInputContainer}>
                    <TextInput
                        secureTextEntry
                        style={(iconFileName) ? textInputStyle : [textInputStyle, {paddingHorizontal: wp(4)}]}
                        placeholder={placeHolderText && placeHolderText || ''}
                        placeholderTextColor={placeHolderColor? placeHolderColor : colors.LIGHTGRAY}
                        onChangeText={onChangeText}
                        secureTextEntry={secureText}
                        keyboardType={keyboardType && keyboardType || 'default'}
                        autoCapitalize={'none'}
                        multiline={isMultiline}
                        maxLength={maxLength && maxLength}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(2),
        flexDirection: 'row',
        marginVertical: wp(1)
    },
    iconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputContainer: {
        flex: 6,
        paddingVertical: wp(1),
        paddingHorizontal: wp(1)
    },
    textInputStyle: {
        height: '100%',
        color: colors.APPBROWN
    }
})

export {CustomTextInput};
