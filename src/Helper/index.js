import { 
    lunchData, 
    snackData, 
    deliveryData,
    distanceData,
    forYouData,
    menuClassificationData,
    menuData,
    menuRangeData,
    communicationType,
    cuisineCountry,
    portionSize,
    markers,
    spicyMenu,
    menuAvailibility,
    vegMenu,
    nonvegMenu,
    createMenuAvail,
    allergensMenu
} from './Constant/appConstants'

import {
    boxShadow,
    outerBoxShadow,
    innerBoxShadow
} from './Constant/shadow';

import {
    wp,
    hp,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    normalizeFont,
    RFValue,
    isAndroid,
    isIOS
} from './ResponsiveUI/responsiveUIContainer';

import { colors } from './Constant/colors';
import { fontStyles, fontSizes } from './Constant/fontSizes';
import { validateEmail, validateName, validatePasswordConfirmPassword, validatePassword, validateMobile } from './Constant/validatorFile';

export {
    colors,
    boxShadow,
    lunchData,
    snackData,
    outerBoxShadow,
    validatePassword,
    validatePasswordConfirmPassword,
    validateName,
    validateMobile,
    validateEmail,
    innerBoxShadow,
    fontSizes,
    fontStyles,
    wp,
    hp,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    normalizeFont,
    RFValue,
    isIOS,
    isAndroid,
    deliveryData,
    distanceData,
    forYouData,
    menuClassificationData,
    menuData,
    menuRangeData,
    communicationType,
    cuisineCountry,
    portionSize,
    markers,
    spicyMenu,
    menuAvailibility,
    vegMenu,
    nonvegMenu,
    createMenuAvail,
    allergensMenu
}
