import { LOGIN_CHEF, LOGOUT_CHEF, SELECTED_LANGUAGE, SIGN_UP, PROCESSING, STATUS, GET_ALL_CHEF, GET_ALL_COUNTRIES } from '../../Actions/types';
import { user } from '../initialState'
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = user

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {

        case PROCESSING:
            return {
                ...state,
                processing: action.payload
            }

        case STATUS:
            return {
                ...state,
                status: action.payload
            }

        case LOGIN_CHEF: {
            return {
                ...state,
                user: payload
            }
        }

        case GET_ALL_CHEF: {
            return {
                ...state,
                chefData: payload
            }
        }

        case SIGN_UP: {
            return {
                ...state,
                userSignup: payload
            }
        }

        case LOGOUT_CHEF: {
            return {
                ...state,
                user: payload
            }
        }

        case SELECTED_LANGUAGE: {
            if (action.payload) {
                AsyncStorage.setItem('appLanguage', JSON.stringify(action.payload));
            }
            return {
                appLanguage: action.payload
            };
        }

        case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: payload
            }
        }
        default:
            return {
                state
            }
    }
}
