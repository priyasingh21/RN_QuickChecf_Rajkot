import { SET_COMMUNICATION_PREFERENCE } from './types';
import { API_ENDPOINT, BASE_URL } from '../../Helper/Constant/apiContants'
import { processing } from './utility';
import AsyncStorage from '@react-native-community/async-storage';

let api_token = '';
let user_id = '';

AsyncStorage.getItem('loginData').then(usr => {
    if (usr) {
        api_token = JSON.parse(usr).data[0].api_token;
        user_id = JSON.parse(usr).data[0].id;
    }
}).catch(e => {

})

const setCummunicationPreferenceData = (data) => {
    if (api_token !== '') {
        const { allow_pushnotification, allow_email, allow_post, allow_phone, allow_sms } = data;
        let formData = new FormData();
        formData.append('allow_pushnotification', allow_pushnotification);
        formData.append('allow_email', allow_email);
        formData.append('allow_post', allow_post);
        formData.append('allow_phone', allow_phone);
        formData.append('allow_sms', allow_sms);

        return async (dispatch) => {
            processing(dispatch, true)
            try {
                const response = await fetch(BASE_URL + API_ENDPOINT.COMMUNICATION_PREFERENCE, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + api_token
                    }
                });
                const res = await response.json();
                if (res) {
                    processing(dispatch);
                    dispatch({
                        payload: res,
                        type: SET_COMMUNICATION_PREFERENCE
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
    setCummunicationPreferenceData
}
