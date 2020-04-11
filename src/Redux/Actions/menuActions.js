import {FOR_YOU_DATA, MENU_TYPE_DATA, MENUS, ALL_TAGS_AND_SUBTAGS} from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants'
import { processing, status } from './utility';

const getAllMenuTypes = (data = {}) => {
    let api_token = data.api_token;
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
    let api_token = data.api_token;

    if (api_token) {
        let formData = new FormData();
        formData.append('data', data);
        return (dispatch) => {
            processing(dispatch, true)
            fetch(BASE_URL + API_ENDPOINT.MENU, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + api_token
                }
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

const getAllTagsWithSubTags = (data = {}) => {
    let api_token = data.api_token;

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
                        return Promise.resolve(true)
                    }
                })
                .catch(e => {
                    processing(dispatch)
                    return Promise.reject(true)
                })
        };
    }
};

export {
    getAllMenuTypes,
    getAllMenu,
    getAllTagsWithSubTags
}
