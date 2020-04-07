import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

let scale = SCREEN_WIDTH / 375;  // for 5s devices
let isAndroid = Platform.OS === 'android';
let isIOS = Platform.OS === 'ios';

const standardLength = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
const deviceHeight = (Platform.OS === "android")? standardLength - StatusBar.currentHeight : standardLength;

const widthPercentageToDP = widthPercent => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

const heightPercentageToDP = heightPercent => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

const normalizeFont = size => {
    let newSize = size * scale;
    if (Platform.OS === 'ios') {
        return PixelRatio.roundToNearestPixel(newSize)
    } else {
        return PixelRatio.roundToNearestPixel(newSize) - 2;
    }
};

const RFValue = (fontSize, standardScreenHeight = 680) => {
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
};

export {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    normalizeFont,
    RFValue,
    isAndroid,
    isIOS
};
