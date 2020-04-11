import {FOR_YOU_DATA, MENU_TYPE_DATA, MENUS, ALL_TAGS_AND_SUBTAGS} from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants'
import { processing, status } from './utility';
import AsyncStorage from '@react-native-community/async-storage';

let api_token = '';
let user_id = '';

AsyncStorage.getItem('loginData').then(usr => {
    if(usr) {
        api_token = JSON.parse(usr).data[0].api_token;
        user_id = JSON.parse(usr).data[0].id;
    }
}).catch(e => {

})

const getAllMenuTypes = () => {
    if (api_token) {
        return (dispatch) => {
            processing(dispatch, true)

            fetch(BASE_URL + API_ENDPOINT.MENU_TYPES, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + api_token
                }
            })  .then(response => response.json())
                .then(res => {
                    if (res) {
                        processing(dispatch);
                        dispatch({
                            payload: res,
                            type: MENU_TYPE_DATA
                        });
                    }
                }).catch(e => {
            })
        };
    }
};

const getAllMenu = (data = {}) => {
    if (api_token) {
        let formData = new FormData();
        formData.append('data', data);
        return (dispatch) => {
            processing(dispatch, true)
            fetch(BASE_URL + API_ENDPOINT.MENU, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + api_token
                },
                body: formData
            })  .then(response => response.json())
                .then(res => {
                    processing(dispatch);
                    if (res) {
                        dispatch({
                            payload: res,
                            type: MENUS
                        });
                    }
                }).catch(e => {
                processing(dispatch)
            })
        };
    }
};

const getAllTagsWithSubTags = () => {
    if (api_token) {
        return (dispatch) => {
            processing(dispatch, true)
            fetch(BASE_URL + API_ENDPOINT.TAGS, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + api_token
                },
            })  .then(response => response.json())
                .then(res => {
                    processing(dispatch);
                    if (res) {
                        dispatch({
                            payload: res,
                            type: ALL_TAGS_AND_SUBTAGS
                        });
                    }
                }).catch(e => {
                processing(dispatch)
            })
        };
    }
};

export {
    getAllMenuTypes,
    getAllMenu,
    getAllTagsWithSubTags
}
