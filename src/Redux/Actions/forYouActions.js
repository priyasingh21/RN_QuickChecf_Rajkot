import { FOR_YOU_DATA } from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants'
import { processing, status } from './utility';
import AsyncStorage from '@react-native-community/async-storage';

let api_token = '';
let user_id = '';

AsyncStorage.getItem('loginData').then(usr => {
    if(usr) {
        api_token = JSON.parse(usr).api_token;
        user_id = JSON.parse(usr).id;
    }
}).catch(e => {

})

const getAllForYouTypes = () => {
    if(api_token !== '') {
        return async (dispatch, getState) => {
            processing(dispatch, true)
            try {
                const response = await fetch(BASE_URL + API_ENDPOINT.FOR_YOU, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + api_token
                    }
                });
                const res = await response.json();
                if (res) {
                    processing(dispatch);
                    dispatch({
                        payload: res,
                        type: FOR_YOU_DATA
                    });
                }
            }
            catch (err) {
                processing(dispatch);
                return err;
            }
        };
    }
};

export {
    getAllForYouTypes
}
