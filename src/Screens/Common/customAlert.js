import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {wp, hp, fontSizes, colors, boxShadow} from '../../Helper';
import {selectLanguage} from "../../Redux/Actions";
import {connect} from "react-redux";

class CustomAlert extends Component {

    render() {
        const {transparentBackgroundStyle, alertMainContainerStyle, alertHeaderStyle, alertTitleTextStyle,
            alertContainerStyle, alertMessageTextStyle, alertOKTextStyle, alertButtonTextStyle, common
        } = styles;
        const {title, message, buttonTitle, handleAlertButtonClick,
            buttonTitle2, handleAlertButtonCancelClick
        } = this.props;

        return (
            <View style={[transparentBackgroundStyle, {...common}]}>
                <View style={[alertMainContainerStyle, {...common}]}>
                    <View style={alertHeaderStyle}>
                        <Text style={[alertTitleTextStyle, {paddingTop: (this.props && this.props.buttonTitle2) && 6 || 0}]}>{title && title || ''}</Text>
                    </View>
                    <View style={[alertContainerStyle]}>
                        <Text style={[alertMessageTextStyle, {paddingVertical: (this.props && this.props.buttonTitle2) && 2 || 0}]}>{message && message || ''}</Text>
                    </View>

                    <View style={{
                        width:'100%',
                        flexDirection: 'row',
                        borderTopWidth: 0.5,
                        borderTopColor:'gray',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical:hp(1)
                    }}>
                        {
                            buttonTitle2 && <TouchableOpacity
                                onPress={handleAlertButtonCancelClick}
                                style={[alertOKTextStyle, {...boxShadow}]}>
                                <View style={{ flex:1, borderRightWidth: 0.5, borderRightColor:'gray'}}>
                                    <Text style={alertButtonTextStyle}>{buttonTitle2 && buttonTitle2 || ''}</Text>
                                </View>
                            </TouchableOpacity>
                        }

                        <View style={alertOKTextStyle} >
                            <TouchableOpacity onPress={handleAlertButtonClick}>
                                <Text style={alertButtonTextStyle}>{buttonTitle && buttonTitle || ''}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alertMainContainerStyle: {
        width: wp('80%'),
        height: wp('45%'),
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 4,
    },
    alertHeaderStyle: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    alertContainerStyle: {
        flex: 1,
        width: '100%',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: fontSizes.small,
        paddingVertical:hp('1%')
    },
    alertButtonStyle: {
        flex: 0.5,
        width: '100%',
        justifyContent: 'space-evenly',
        paddingHorizontal: 2,
        paddingVertical: 4,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    alertTitleTextStyle: {
        textAlign: 'center',
        color: colors.APPGREEN,
        fontSize: fontSizes.largel,
        fontWeight: 'bold',
        padding: 2,
    },
    alertMessageTextStyle: {
        textAlign: 'center',
        color: colors.APPBROWN,
        fontSize: fontSizes.medium,
    },
    alertOKTextStyle: {
        alignSelf: 'center',
        marginVertical: hp(1),
        flex:1,
    },
    alertButtonTextStyle: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        textAlign:'center',
    },
    transparentBackgroundStyle: {
        flex: 1,
        height: hp(100),
        width: wp(100),
        bottom: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2000
    },
    common: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
    const {User} = state;
    return {
        User
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectLanguage
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert);
