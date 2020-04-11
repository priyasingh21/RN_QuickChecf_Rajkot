import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    LOGIN_CHEF,
    LOGOUT_CHEF,
    SELECTED_LANGUAGE,
    SIGN_UP,
    GET_ALL_CHEF,
    GET_ALL_COUNTRIES,
    BECOME_A_CHEF,
    GET_CHEF,
    UPDATE_USER_PROFILE, FOLLOW_UNFOLLOW_CHEF,
} from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants';
import { processing } from './utility'

const signUp = (data = {}) => {
    const { name, email, password, confirmPassword, mobile, country_code, country_id } = data;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('country_code', country_code);
    formData.append('country_id', country_id);

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
                    processing(dispatch);
                    if (res && res.success) {
                        AsyncStorage.setItem('loginData', JSON.stringify(res), (r) => {})
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

const getAllChefs = (data) => {
    let api_token = data.api_token
    if(api_token){
        return (dispatch, getState) => {
            processing(dispatch, true)
            console.log("URL ======> ", BASE_URL + API_ENDPOINT.All_CHEFS)
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
}

const getChef = (data) => {
    let api_token = data.api_token
    if(api_token){
        let chefId = data.chef_id
        return (dispatch, getState) => {
            processing(dispatch, true)
            return fetch(BASE_URL + API_ENDPOINT.CHEF + '?chef_id=' + chefId, {
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
                            type: GET_CHEF
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
}

const followUnfollowChef = (data) => {
    let api_token = data.api_token

    if(api_token){
        let chefId = data.chef_id
        return (dispatch, getState) => {
            processing(dispatch, true)
            return fetch(BASE_URL + API_ENDPOINT.TOGGLE_FOLLOW + '?chef_id=' + chefId, {
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
                            type: FOLLOW_UNFOLLOW_CHEF
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
}

const becomeAChef = (data) => {
    let api_token = data.api_token

    if(api_token){
        return (dispatch, getState) => {
            processing(dispatch, true)
            return fetch(BASE_URL + API_ENDPOINT.BECOME_CHEF, {
                method: 'POST',
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
                            type: BECOME_A_CHEF
                        });
                    } else {
                        processing(dispatch)
                    }
                })
                .catch(err => {
                    processing(dispatch)
                    dispatch({
                        payload: {},
                        type: BECOME_A_CHEF
                    });
                });
        };
    }
}

const updateProfile = (data) => {
    let api_token = data.api_token

    if(api_token){
        const {name, date_of_birth, gender, delivery_type, lat, long} = data;
        return (dispatch, getState) => {
            processing(dispatch, true)
            let paramURL = '?name=' + name + '&date_of_birth=' + date_of_birth + '&gender=' + gender + '&delivery_type=' + delivery_type + '&lat=' + lat + '&long='+ long;
            return fetch(BASE_URL + API_ENDPOINT.BECOME_CHEF + paramURL, {
                method: 'POST',
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
                            type: UPDATE_USER_PROFILE
                        });
                    } else {
                        processing(dispatch)
                    }
                })
                .catch(err => {
                    processing(dispatch)
                    dispatch({
                        payload: {},
                        type: BECOME_A_CHEF
                    });
                });
        };
    }
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
    getCountryList,
    becomeAChef,
    getChef,
    updateProfile,
    followUnfollowChef
}
