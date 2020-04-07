import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {wp, hp, colors, fontSizes} from '../../Helper'
import Modal from 'react-native-modal'

class AlertModal extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {isVisible, onCancelClick, onOtherBtnClick, cancelBtnTitle, otherBtnTitle, modalTitle, modalDesc} = this.props
        return (
            <Modal
                backdropOpacity={0.3}
                isVisible={isVisible}
                style={{margin: 0, padding: 0, justifyContent: 'center'}}
                onBackdropPress={() => onCancelClick('isVisible')}
            >
                <View style={styles.modalContainer}>
                    <View style={{alignItems: 'center', paddingHorizontal: hp(3), paddingBottom: hp(2)}}>
                        <Text style={styles.modalTitle}>{modalTitle}</Text>
                        <Text style={styles.modalText}>{modalDesc}</Text>
                    </View>
                    <View style={styles.modalHorizontalLine}/>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={() => onCancelClick('isVisible')} style={styles.modalButton}>
                            <Text style={styles.modalCancelButton}>{cancelBtnTitle}</Text>
                        </TouchableOpacity>
                        {otherBtnTitle &&
                        <View style={styles.modalVerticalLine}/>
                        }
                        {otherBtnTitle &&
                        <TouchableOpacity onPress={onOtherBtnClick} style={styles.modalButton}>
                            <Text style={styles.modalReportButton}>{otherBtnTitle}</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}

export default AlertModal

AlertModal.defaultProps = {
    safeArea: {},
    onCancelClick: null,
    onReportItem: null
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.WHITE,
        marginHorizontal: wp('6.33%'),
        borderRadius: 10,
        overflow: 'hidden',
        paddingTop: hp('3%')
    },
    modalTitle: {
        fontSize: fontSizes.large,
        color: colors.BLACK
    },
    modalText: {
        fontSize: fontSizes.xsmall,
        color: colors.BLACK,
        textAlign: 'center'
    },
    modalHorizontalLine: {
        width: '100%',
        height: hp('0.1%'),
        backgroundColor: colors.GRAY
    },
    modalButtonContainer: {
        flexDirection: 'row',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,
        paddingVertical: hp(1)
    },
    modalCancelButton: {
        color: colors.SKYBLUE,
        fontSize: fontSizes.large,
    },
    modalReportButton: {
        color: colors.RED,
        fontSize: fontSizes.large,
    },
    modalVerticalLine: {
        width: wp('0.1%'),
        height: '100%',
        backgroundColor: colors.GRAY
    }
})
