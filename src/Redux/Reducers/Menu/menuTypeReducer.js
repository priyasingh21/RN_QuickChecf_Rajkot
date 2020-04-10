import {MENU_TYPE_DATA, PROCESSING, STATUS, MENUS, ALL_TAGS_AND_SUBTAGS} from '../../Actions/types';

const INITIAL_STATE = {
    menuTypeData: [],
    menus: [],
    allTags: []
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload } = action;

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

        case MENU_TYPE_DATA: {
            return {
                menuTypeData: payload
            }
        }

        case ALL_TAGS_AND_SUBTAGS: {
            return {
                allTags: payload
            }
        }

        case MENUS: {
            return {
                menus: payload
            }
        }
        default:
            return{
                state
            }
    }
}
