import {
    LOGIN_CHEF,
    LOGOUT_CHEF,
    SELECTED_LANGUAGE,
    SIGN_UP,
    PROCESSING,
    STATUS,
    GET_ALL_CHEF,
    GET_ALL_COUNTRIES,
    BECOME_A_CHEF,
    GET_CHEF,
    UPDATE_USER_PROFILE,
    FOLLOW_UNFOLLOW_CHEF
} from '../../Actions/types';
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

        case FOLLOW_UNFOLLOW_CHEF: {
            return {
                ...state,
                user: payload
            }
        }

        case BECOME_A_CHEF: {
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

        case GET_CHEF: {
            return {
                ...state,
                singleChef: payload
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

        case UPDATE_USER_PROFILE: {
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
