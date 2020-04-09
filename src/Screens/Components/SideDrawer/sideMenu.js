import React, {Component} from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Modal,
    AsyncStorage,
    BackHandler
} from 'react-native';
import {boxShadow, colors, fontSizes, hp, wp} from '../../../Helper';
import {CustomAlert2} from '../../Common';
import Icon from'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import RNRestart from 'react-native-restart';
import {StackActions, NavigationActions}  from 'react-navigation';

const languageAfterLogin = ['english', 'arabic', 'spanish'];

class SideMenu extends Component {

    constructor(props) {
        super(props);
        let langData =  props && props.appLanguage && props.appLanguage.languageKey;
        this.state={
            modalVisible: false,
            languageSelection : props.appLanguage && props.appLanguage || '',
            selectedIndex: langData && langData === 'en' ? 0 : (props.appLanguage && langData && langData === 'ar') ? 1 : 2,
            oldLanguage : _.cloneDeep(props.appLanguage),
            isAlertVisible: false,
            user: {}
        }
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            AsyncStorage.getItem('loginData').then(res => {
                if (res && JSON.parse(res).id) {
                    this.setState({
                        user: JSON.parse(res)
                    })
                }
            }).catch(e => { })
        }
    }

    handleLogout = (props) => {
        this.setState({
            isAlertVisible: true
        })
    };

    handleModal = () => {
        this.props.navigation.closeDrawer();
        this.setState({modalVisible: true})
    };

    handleSetLanguage = (data, index) => {
        const {languageSelection} = this.state;

        let dataTemp = data;
        let english = 'english';
        let spanish = 'spanish';
        let arabic = 'arabic';

        if(dataTemp === (english || 'english')){
            data = 'en'
        }else if(dataTemp === (spanish || 'spanish')){
            data = 'es'
        }else if(dataTemp === (arabic || 'arabic')){
            data = 'ar'
        }
        let temp = languageSelection;
        temp.languageKey = data;
        if(temp.languageKey === 'ar'){
            temp.isRTL = true
        }else{
            temp.isRTL = false
        }
        this.setState({
            languageSelection: temp,
            selectedIndex: index
        });
    };

    handleSelectBtn = () => {
        const {languageSelection, oldLanguage} = this.state;
        const { appLanguage } = this.props;
        this.setState({
            modalVisible: false
        }, () => {
            AsyncStorage.setItem('oldAppLanguage',  JSON.stringify(oldLanguage)).then((res) => {
                if(JSON.stringify(oldLanguage.languageKey) !== JSON.stringify(languageSelection.languageKey)){
                    this.props.selectLanguage(languageSelection).then( (res1) => {
                            if(res1) {
                                setTimeout(() => {
                                    RNRestart.Restart();
                                }, 1000);
                            } else {
                            }
                    }).catch(err => {});
                }
            });
        });
    };

    handleAlertOk = () => {
        const {handleLocalAction, localActions, navigation} = this.props;
        this.setState({
            isAlertVisible: false
        }, () => {
            this.props.navigation.closeDrawer();
            AsyncStorage.setItem('setVerificationCode', JSON.stringify({type: '', entered: ''}))
            handleLocalAction({ type: localActions.LOGOUT})
            AsyncStorage.getItem('loginData').then(res => {
                if(JSON.parse(res) === null) {
                    let resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'InitialScreen' })],
                    })
                    this.props.navigation.dispatch(resetAction);
                }
            })
        })
    }

    render() {
        const { touchableView, headerView} = styles;
        const { modalVisible, selectedIndex, user } = this.state;
        const {area, country_code, email, mobile, profile_image, temp_image, username, role, name, location} = user
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={{justifyContent: 'space-between'}}>
                    {/*uppper section*/}
                    <View style={[styles.vwImage, boxShadow,{ shadowOffset: {width: 0, height: 4}, elevation: 5}]}>
                        <ImageBackground
                            style={{height: '100%', width: '100%'}}
                            source={require('../../../../assets/splash.png')}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                            }}>
                                <View style={styles.imgStyle}>
                                            <Image
                                                source={{uri: profile_image || temp_image}}
                                                style={{height: '100%', width: '100%'}}
                                                resizeMode={'cover'}
                                            />
                                </View>
                                <View style={{
                                    flex: 1,
                                    height: '100%',
                                    justifyContent: 'center'
                                }}>
                                          <Text style={{
                                                fontSize: fontSizes.mini,
                                                color: colors.WHITE,
                                                fontWeight: 'bold'
                                            }}>
                                                {`${name}`}
                                         </Text>

                                         <Text style={{
                                                fontSize: fontSizes.xmini,
                                                color: colors.WHITE,
                                                fontWeight: 'bold'
                                            }}>
                                                {`${email}`}
                                         </Text>

                                                <Text style={{
                                                fontSize: fontSizes.xmini,
                                                color: colors.WHITE,
                                                fontWeight: 'bold'
                                            }}>
                                                {`${country_code}${mobile}`}
                                                </Text>

                                                <Text style={{
                                                fontSize: fontSizes.medium,
                                                color: colors.APPGREEN,
                                                fontWeight: 'bold'
                                            }}>
                                                {`Edit Profile`}
                                                </Text>
                                </View>
                            </View>
                            <Text style={{
                                fontSize: fontSizes.xmini,
                                color: colors.WHITE,
                                fontWeight: 'bold',
                                textAlign: 'right',
                                marginHorizontal: wp(3)
                            }}>{'v3.2.43'}</Text>
                        </ImageBackground>
                    </View>

                    {/*bottom section*/}
                    <View style={styles.navSectionStyle}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AboutUs')}
                                style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'What is Quick Chef?'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DeliveryAreas')}
                                style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'Delivery Areas'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AppVedioDetailScreen')} style={[touchableView, {marginTop: 0, flexDirection: 'row'}]}>
                                <Text style={styles.navItemStyle}>{'How to videos'}</Text>
                                <Icon name={'playcircleo'} size={wp(4)} color={colors.APPGREEN} style={{marginHorizontal: wp(2)}} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressList')} style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'Manage Addresses'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handleModal} style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'Language'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Faq')} style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'FAQ'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')} style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'Feedback'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsAndConditions')} style={[touchableView, {marginTop: 0}]} >
                                <Text style={styles.navItemStyle}>{'Terms and Conditions'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunicationPreference')} style={[touchableView, {marginTop: 0}]} >
                                <Text style={styles.navItemStyle}>{'Communication preferences'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.handleLogout(this.props)}
                                style={[touchableView, {marginTop: 0}]}>
                                <Text style={styles.navItemStyle}>{'Sign out'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        animationType="none"
                        transparent
                        visible={modalVisible}
                    >
                        <TouchableOpacity style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            alignSelf: 'center',
                            backgroundColor: colors.BLACKTRANSPARENT
                        }} onPress={() => this.setState({modalVisible: false})}>
                            <View style={{
                                marginTop: hp('35%'),
                                height: '26%',
                                width: '75%',
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderRadius: 5,
                                overflow: 'hidden',
                                ...boxShadow
                            }}>
                                {
                                    languageAfterLogin.map((item, index) => {
                                        return(
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    height: '18.5%',
                                                    marginVertical: hp('1%'),
                                                    marginHorizontal: hp('2%'),
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row'
                                                }}
                                                onPress={() => this.handleSetLanguage(item, index)}
                                            >
                                                <Text style={{fontSize: fontSizes.medium, color: colors.APPGREEN}}>{item}</Text>
                                                <View style={ {
                                                    height: hp('2%'),
                                                    width: hp('2%'),
                                                    borderRadius: hp('1%'),
                                                    borderColor: (index === selectedIndex) ? colors.APPGREEN : colors.LIGHTGRAY,
                                                    borderWidth : wp(1)
                                                }}/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                <View style={{
                                    height: '22%',
                                    width: '100%',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    borderTopWidth: 0.5,
                                    borderColor: colors.APPGREEN
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            flex: 1,
                                            backgroundColor: 'white'
                                        }}
                                        onPress={() => this.setState({modalVisible: false})}
                                    >
                                        <Text style={{color: colors.APPGREEN, fontSize: fontSizes.medium}}>{'Cancel'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: colors.APPGREEN,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            flex: 1,
                                            height: ('100%')
                                        }}
                                        onPress={this.handleSelectBtn}
                                    >
                                        <Text style={{color: 'white', fontSize: fontSizes.medium}}>{'Ok'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
                {
                    (this.state.isAlertVisible) &&
                    <CustomAlert2
                        isVisible={this.state.isAlertVisible}
                        onCancelClick={() => {
                            this.setState({isAlertVisible: false})
                        }}
                        onOtherBtnClick={this.handleAlertOk}
                        cancelBtnTitle={'No'}
                        otherBtnTitle={'Yes'}
                        modalTitle={'Logout'}
                        modalDesc={'Are you sure you want to logout?'}
                    />
                }

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    navItemStyle: {
        paddingVertical: wp(4),
        fontSize: fontSizes.small,
        color: colors.BLACK,
        fontWeight: 'bold'
    },
    navSectionStyle: {
        padding: wp('10%'),
    },
    vwImage: {
        width: '100%',
        height: hp('25%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgStyle: {
        height: wp(20),
        width: wp(20),
        borderRadius: wp(10),
        overflow: 'hidden',
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    touchableView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('1%')
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('40%')
    }
});

export {SideMenu}
