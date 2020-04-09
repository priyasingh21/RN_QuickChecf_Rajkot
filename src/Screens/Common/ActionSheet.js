import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {hp, wp, colors, fontSizes} from '../../Helper'
import Modal from 'react-native-modal'

class ActionSheet extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFocus: false
    }
  }

  render () {
    const {safeArea, isVisible, onClickCancel, otherButtonOption} = this.props
    return (
      <Modal
        backdropOpacity={0.3}
        isVisible={isVisible}
        style={{margin: 0, padding: 0}}
        onBackdropPress={onClickCancel}
      >
        <View style={{...styles.modalContainer, paddingBottom: safeArea.bottom, backgroundColor: 'transparent'}}>
          <View style={{borderRadius: 14, overflow: 'hidden', backgroundColor: colors.WHITE, marginHorizontal: wp('3%')}}>
            {
              otherButtonOption.map((buttonArray, index) => {
                return (
                  <View style={{backgroundColor: colors.WHITE}}>
                    <TouchableOpacity onPress={buttonArray.onClick} style={{...styles.deleteButtonContainer, flex: 1}}>
                      <Text style={{...styles.buttonText, ...styles.deleteButtonText, color: buttonArray.color}}>{buttonArray.title}</Text>
                    </TouchableOpacity>

                    {index !== otherButtonOption.length - 1 && <View style={{height: 1, width: '100%', backgroundColor: colors.BLACK}} />}
                  </View>
                )
              })
            }
          </View>
          <TouchableOpacity onPress={onClickCancel} style={{...styles.deleteButtonContainer, borderRadius: 14, marginTop: hp('1%'), marginHorizontal: wp('3%')}} activeOpacity={1}>
            <Text style={{...styles.buttonText, ...styles.deleteButtonText}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('5%'),
    paddingHorizontal: wp('4.23%')
  },
  headerRightText: {
    fontSize: fontSizes.small,
    color: colors.WHITE
  },
  loginContainer: {
    marginTop: hp('4%'),
    marginHorizontal: wp('5.33%')
  },
  loginHeader: {
    fontSize: fontSizes.largel,
    color: colors.WHITE,
    textAlign: 'center'
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp('5.33%'),
    marginBottom: hp('2%')
  },
  loginInpuContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: hp('5%'),
    zIndex: 1
  },
  loginInputBox: {
    fontSize: fontSizes.small,
    color: colors.WHITE,
    paddingVertical: hp('1%')
  },
  passwordIcon: {
    position: 'absolute',
    right: 0,
    bottom: hp('1%'),
    alignSelf: 'center'
  },
  loginButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1.5%'),
    borderRadius: 4,
    marginTop: hp('2%'),
    marginBottom: hp('1.5%')
  },
  loginBottomText: {
    fontSize: fontSizes.xsmall,
    color: colors.WHITE
  },
  loginBottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('5.33%')
  },
  loginSkipContainer: {
    paddingVertical: hp('0.5%'),
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: fontSizes.large,
    color: colors.BLACK
  },
  buttonText: {
    fontSize: fontSizes.small,
    color: colors.WHITE,
    paddingVertical: hp('1%')
  },
  cartButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden'
  },
  cartButtonImage: {
    height: hp('6%'),
    width: wp('45%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtons: {
    fontSize: fontSizes.BLUE,
    color: colors.BLUE,
    textAlign: 'center'
  },
  verticalLine: {
    height: hp('3%'),
    width: wp('0.5%'),
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    margin: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderColor: colors.LIGHTGRAY,
    paddingHorizontal: wp('8%')
  },
  mediumText: {
    fontSize: fontSizes.xsmall,
    color: colors.BLACK
  },
  bottomContainer: {
    marginTop: hp('2%')
  },
  label: {
    fontSize: fontSizes.xsmall,
    color: colors.BLACK,
    marginBottom: hp('1%')
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 6
  },
  inputBox: {
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    width: '95%',
    height: '100%',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: hp('1%'),
    fontSize: fontSizes.mini
  },
  inputChatBox: {
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    width: '95%',
    height: '100%',
    paddingHorizontal: hp('1%'),
    fontSize: fontSizes.xsmall,
  },
  offerButtonContainer: {
    paddingHorizontal: wp('8%'),
    borderWidth: 2,
    borderColor: colors.OFFGREEN,
    borderRadius: 4,
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  offerButtonText: {
    fontSize: fontSizes.small,
    color: colors.SKYBLUE
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: hp('2%'),
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: {height: 1, width: 1},
    elevation: 1,
    paddingHorizontal: wp('5.33%')
  },
  boxShadow: {
    shadowOpacity: 0.15,
    shadowColor: colors.BLACK,
    shadowOffset: {height: 5, width: 1},
    elevation: 1
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center'
  },
  switchCircle: {
    height: 30,
    width: 30,
    borderRadius: 16,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    shadowOpacity: 0.3,
    shadowColor: colors.BLACK,
    shadowOffset: {height: 1, width: 1},
    elevation: 1
  },
  deleteButtonContainer: {
    marginTop: hp('1%'),
    borderRadius: 14,
    backgroundColor: colors.WHITE,
    marginHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    alignItems: 'center'
  },
  deleteButtonText: {
    fontSize: fontSizes.large,
    color: colors.BLACK,
    lineHeight: 25,
    textAlign: 'center'
  },
  moreItemCardContainer: {
    width: wp('41%'),
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: {height: 1, width: 1},
    elevation: 1
  },
  like: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  itemCardBottomContainer: {
    marginBottom: hp('0.5%')
  },
  itemName: {
    fontSize: fontSizes.mini,
    color: colors.BLACK,
    marginBottom: hp('0.5%')
  },
  cardImageContainer: {
    height: hp('16%'),
    width: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    overflow: 'hidden'
  },
  likeContainer: {
    backgroundColor: 'rgba(0,0,0,0.14)',
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3
  },
  noDataText: {
    fontSize: fontSizes.small,
    color: colors.GRAY
  },
  // deleteButtonText: {
  //   color: colors.BLACK,
  //   lineHeight: 25,
  //   textAlign: 'center'
  // },
  // deleteButtonContainer: {
  //   backgroundColor: colors.WHITE,
  //   paddingVertical: hp('2%'),
  //   alignItems: 'center'
  // },
  // buttonText: {
  //   fontSize: fontSizes.medium,
  //   color: colors.BLACK
  // }
})

export default ActionSheet

ActionSheet.defaultProps = {
  safeArea: {},
  onClickCancel: null,
  otherButtonOption: {},
  isVisible: null
}
