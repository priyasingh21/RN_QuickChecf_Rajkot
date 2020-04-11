import {CUISINE_DATA, FOR_YOU_DATA} from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants'
import { processing, status } from './utility';

const getAllForYouTypes = (data) => {
    let api_token = data.api_token;
    if(api_token) {
        return (dispatch, getState) => {
            processing(dispatch, true)
            fetch(BASE_URL + API_ENDPOINT.FOR_YOU, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + api_token
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        processing(dispatch);
                        dispatch({
                            payload: res,
                            type: FOR_YOU_DATA
                        });
                    }
                }).catch(e => {})
        };
    }
};

export {
    getAllForYouTypes
}
