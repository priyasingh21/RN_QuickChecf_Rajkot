// import i18n from "i18n-js";
// import { memoize } from 'lodash';
// import * as RNLocalize from "expo-localization";
//
// import * as en from './en'; // English
// import * as ar from './ar';  // Arabic
// import * as es from './es'; // Spanish
// // import {I18nManager} from 'react-native';
//
// const translationGetters = {
//     en: () => en.default,
//     es: () => es.default,
//     ar: () => ar.default
// };
//
// i18n.fallbacks = true;
// i18n.translations = translationGetters;
// i18n.locale = RNLocalize.locale; //detect from device's setting.
// // i18n.locale = 'en'; //only single language.
//
// const strLocale = memoize(
//     (key, config) => i18n.t(key, config),
//     (key, config) => (config ? key + JSON.stringify(config) : key),
// );
//
// const setI18nConfig = (language = null) => {
//     i18n.locale = language;
// };
//
// export {
//     setI18nConfig,
//     strLocale,
// };
