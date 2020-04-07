import React, {Component} from 'react'
import {Text, View, StyleSheet, Animated, Easing, TouchableOpacity, Platform} from 'react-native'
import {hp, wp, colors, fontSizes} from '../../Helper'

class Banner extends Component {
    constructor (props) {
        super(props)
        this.state = {
            y: new Animated.Value(-(props.safeArea.top + hp('6%')))
        }
    }

    componentDidMount () {
        const {showBanner} = this.props
        this.onAnimate(showBanner)
    }

    componentWillReceiveProps (nextProps) {
        this.onAnimate(nextProps.showBanner)
    }

    onAnimate = (showBanner) => {
        const {y} = this.state
        const {safeArea} = this.props

        Animated.spring(y, {
            toValue: showBanner ? 0 : -(safeArea.top + hp('6%')),
            easing: Easing.back(),
            duration: 800
        }).start()
    }

    render () {
        const {safeArea, message, onPress, title, isError, bannerColor} = this.props
        const {y} = this.state
        return (
            <Animated.View style={{...styles.container, top: y, paddingTop: safeArea.top, height: safeArea.top + hp('6%'), backgroundColor: isError ? colors.RED : (bannerColor) ? bannerColor : colors.APPGREEN}}>
                <TouchableOpacity onPress={onPress && onPress} style={{flex: 1, top: (Platform.OS === 'android') ? -hp('0.3%') : -hp('0.8%'), justifyContent: 'center', alignItems: 'center'}}>
                    {
                        title && <Text style={{...styles.buttonText, textAlign: 'center', fontWeight: 'bold', fontSize: fontSizes.large}}>{title}</Text> || null
                    }
                    {
                        title &&
                        <Text style={{...styles.buttonText, marginHorizontal: wp('2%'), textAlign: 'center', width: '96%'}} numberOfLines={1}>{message}</Text> ||
                        <Text style={{...styles.buttonText, marginHorizontal: wp('2%'), textAlign: 'center', width: '96%'}}>{message}</Text>
                    }
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

export default Banner

Banner.defaultProps = {
    showBanner: false
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        zIndex: 1
    },
    buttonText: {
        fontSize: fontSizes.small,
        color: colors.WHITE
    }
})
