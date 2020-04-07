import React, { Component } from 'react';
import {View, BackHandler} from 'react-native';
import {boxShadow, colors, fontSizes, hp, outerBoxShadow, wp} from '../../../Helper'
import {CustomHeader, CustomAlert} from "../../Common";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class DeliveryAreas extends Component{

    constructor(props) {
        super(props);
        this.state={
            isCustomAlertShow: true
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

    handleAlertOk = () => {
        const {isCustomAlertShow} = this.state;
        this.setState({
            isCustomAlertShow: !isCustomAlertShow
        })
    }

    render() {
        return(
            <View style={{
                flex: 1 ,
                backgroundColor: colors.WHITE
            }}>
                <View style={{height: hp(11)}}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isBack={true}
                        titleText={'Delivery Areas'}
                        leftIcon={'md-back'}
                        isDeliveryArea={true}
                    />
                </View>
                <View style={{flex: 1}}>
                    <MapView
                        style={{flex:1}}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>

                { (this.state.isCustomAlertShow) &&
                    <CustomAlert
                        title={'Coming Soon...'}
                        message={'Unfortunately, our services are not rolled out in your area just yet, but will be very soon.'}
                        buttonTitle={'Ok'}
                        handleAlertButtonClick={this.handleAlertOk}
                    />}
            </View>
        )
    }
}

export { DeliveryAreas }
