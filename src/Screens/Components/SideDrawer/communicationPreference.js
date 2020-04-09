import React, { Component } from 'react';
import { Text, View, CheckBox, TouchableOpacity, StyleSheet, FlatList, BackHandler } from 'react-native';
import { boxShadow, colors, fontSizes, hp, outerBoxShadow, wp, communicationType } from '../../../Helper'
import { AppButton, CustomHeader, Banner } from "../../Common";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class CommunicationPreference extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tempArray: communicationType,
            showBanner: false
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    componentWillReceiveProps(nextProps) {
        let communicationData = nextProps && nextProps.communicationPreference
        if(this.props && this.props.communicationPreference !== communicationData) {

        }
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    toggleCheckbox = (item, index) => {
        const { tempArray } = this.state;
        let newSelectedValue = !item.selected
        tempArray[index].selected = newSelectedValue
        this.setState({
            tempArray: [...tempArray]
        })
    }

    renderCheckboxContainer = ({ item, index }) => {
        return (
            <View
                key={index}
                style={styles.checkboxContainer}>

                <Icon
                    name={(item.selected) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={wp(7)}
                    color={(item.selected) ? colors.APPGREEN : colors.GRAY}
                    onPress={() => this.toggleCheckbox(item, index)}
                />

                <Text style={styles.checkboxTitle}>{item.title}</Text>
            </View>
        )
    }

    updateCommunicationPref = () => {
        const { handleLocalAction, localActions } = this.props;
        const { tempArray } = this.state;
        let allow_pushnotification = false;
        let allow_email = false;
        let allow_post = false;
        let allow_phone = false;
        let allow_sms = false;

        let selectedData = tempArray.filter(data => data.selected)
        selectedData && selectedData.length > 0 && selectedData.map(data => {
            if (data.title.toLowerCase() === 'push notification') allow_pushnotification = data.selected;
            if (data.title.toLowerCase() === 'email') allow_email = data.selected;
            if (data.title.toLowerCase() === 'by post') allow_post = data.selected;
            if (data.title.toLowerCase() === 'phone') allow_phone = data.selected;
            if (data.title.toLowerCase() === 'sms') allow_sms = data.selected;
        })

        let data = {
            allow_pushnotification,
            allow_email,
            allow_phone,
            allow_sms,
            allow_post
        }

        this.setState({
            showBanner: true
        }, () => {
            handleLocalAction({ type: localActions.SIGN_UP_USER, data})
            this.hideBanner();
        })
    }

    hideBanner = () => {
        setTimeout(() => {
            this.setState({
                showBanner: false,
            })
        }, 3000)
    }

    render() {
        const { tempArray, showBanner } = this.state;
        let safeArea = {
            top: 20
        }
        return (
            <View style={styles.container}>
                {
                    (showBanner) &&
                    <Banner title={''} showBanner={showBanner} message={'Communication Preferences set successfully.'} safeArea={safeArea} />
                }
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isBack={true}
                        titleText={'Communication Preferences'}
                        leftIcon={'md-back'}
                        isCommunicationPreferences={true}
                    />
                </View>

                <View style={styles.detailContainerMainView}>
                    <View style={{ marginVertical: wp(5) }}>
                        <Text style={styles.textStyle}>{'Please let us know all the ways you would like to hear from us.'}</Text>
                    </View>
                    <View style={{ height: hp(30) }}>
                        <FlatList
                            data={tempArray}
                            renderItem={this.renderCheckboxContainer}
                            bounces={false}
                        />
                    </View>

                    <View style={{ marginVertical: wp(5) }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: colors.BLACK,
                            fontSize: fontSizes.small,
                            fontWeight: 'bold',
                        }}>{'Tick the types of communication you want to receive'}</Text>
                    </View>

                    <AppButton
                        styleBtn={{ width: wp(60), alignSelf: 'center' }}
                        textColor={colors.WHITE}
                        backgroundColor={colors.APPGREEN}
                        buttonText={'Update Preferences'}
                        onBtnPress={this.updateCommunicationPref}
                    />

                    <View style={styles.termsAndConditionContainer}>
                        <Text style={styles.simpleText}>{'You can view details in our '}</Text>

                        <TouchableOpacity>
                            <Text style={styles.termsText}>{'Privacy Policy'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.simpleText}>{' and '}</Text>

                        <TouchableOpacity>
                            <Text style={styles.termsText}>{'Terms and Conditions'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.APPGREEN,
    },
    detailContainerMainView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        paddingHorizontal: wp(8),
    },
    textStyle: {
        alignSelf: 'center',
        color: colors.BLACK,
        fontSize: fontSizes.xsmall,
        fontWeight: 'bold',
    },
    termsAndConditionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: wp(5),
        marginLeft: wp(2.5)
    },
    termsText: {
        color: colors.APPGREEN,
        fontSize: fontSizes.small,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    simpleText: {
        alignSelf: 'center',
        color: colors.BLACK,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: wp(9),
        marginVertical: wp(1)
    },
    checkboxTitle: {
        alignSelf: 'center',
        color: colors.BLACK,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        marginLeft: wp(3)
    }

})

export { CommunicationPreference }
