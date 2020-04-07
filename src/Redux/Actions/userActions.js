import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN_CHEF, LOGOUT_CHEF, SELECTED_LANGUAGE, SIGN_UP, GET_ALL_CHEF, GET_ALL_COUNTRIES } from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants';
import { processing } from './utility'

let api_token = '';
let user_id = '';
AsyncStorage.getItem('loginData').then(usr => {
    if(usr) {
        api_token = JSON.parse(usr).api_token;
        user_id = JSON.parse(usr).id;
    }
}).catch(e => {

})

const signUp = (data = {}) => {
    const { name, email, password, confirmPassword, mobile, country_code } = data;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('country_code', country_code);

    return (dispatch, getState) => {
        processing(dispatch, true)
        return fetch(BASE_URL + API_ENDPOINT.REGISTER, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(res => {
                processing(dispatch)
                if (res && res.success) {
                    processing(dispatch)
                    dispatch({
                        payload: res,
                        type: SIGN_UP
                    });
                } else {
                    processing(dispatch)
                    dispatch({
                        payload: res,
                        type: SIGN_UP
                    });
                }
            })
            .catch(err => {
                processing(dispatch)
                alert('Error in registration', e)
            });
    };
}

const signIn = (data = {}) => {

    if (data) {
        const { username = '', password = '', type } = data;
        let formData = new FormData();
        if (type === 'phone') {
            formData.append('username', username);
        } else {
            formData.append('username', username);
            formData.append('password', password);
        }

        return (dispatch, getState) => {
            processing(dispatch, true)
            return fetch(BASE_URL + API_ENDPOINT.LOGIN, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(res => {
                    processing(dispatch)
                    if (res && res.success) {
                        dispatch({
                            payload: res,
                            type: LOGIN_CHEF
                        });
                    } else {
                        if (res && res.data === 401) {
                            processing(dispatch)
                            dispatch({
                                payload: {},
                                type: LOGIN_CHEF
                            });

                            if (res && !res.success) {
                                processing(dispatch)
                                dispatch({
                                    payload: res,
                                    type: LOGIN_CHEF
                                });
                            }
                        }
                    }
                }).catch(err => {
                    processing(dispatch)
                    dispatch({
                        payload: {},
                        type: LOGIN_CHEF
                    });
                });
        };
    }
};

const logoutApp = () => {
    return (dispatch) => {
        processing(dispatch, true)
        AsyncStorage.removeItem('loginData');
        processing(dispatch)
        dispatch({
            payload: {},
            type: LOGIN_CHEF
        });
        dispatch({
            payload: {},
            type: LOGOUT_CHEF
        });
    };
};

const selectLanguage = languageData => {
    return (dispatch) => {
        processing(dispatch)
        dispatch({
            payload: languageData,
            type: SELECTED_LANGUAGE
        });
    };
};

const getAllChefs = () => {

    return (dispatch, getState) => {
        processing(dispatch, true)
        // return fetch(BASE_URL + API_ENDPOINT.All_CHEFS + '?user_id=' + user_id + '&latitude=' + location.latitude + '&longitude=' + location.longitude + '&api_token=' + api_token, {
        return fetch(BASE_URL + API_ENDPOINT.All_CHEFS, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + api_token
              }
        })
            .then(response => response.json())
            .then(res => {
                if (res) {
                    processing(dispatch)
                    dispatch({
                        payload: res,
                        type: GET_ALL_CHEF
                    });
                } else {
                    processing(dispatch)
                }
            })
            .catch(err => {
                processing(dispatch)
                dispatch({
                    payload: {},
                    type: All_CHEFS
                });
            });
    };
}

const getCountryList = () => {
    return (dispatch, getState) => {
        processing(dispatch, true)

        return fetch(BASE_URL + API_ENDPOINT.COUNTRIES)
            .then(response => response.json())
            .then(res => {
                if (res) {
                    processing(dispatch)
                    dispatch({
                        payload: res,
                        type: GET_ALL_COUNTRIES
                    });
                } else {
                    processing(dispatch)
                }
            })
            .catch(err => {
                processing(dispatch)
                dispatch({
                    payload: [],
                    type: GET_ALL_COUNTRIES
                });
            });
    };

}

export {
    signIn,
    logoutApp,
    selectLanguage,
    signUp,
    getAllChefs,
    getCountryList
}
