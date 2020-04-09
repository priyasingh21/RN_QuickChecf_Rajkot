import {CUISINE_DATA, PROCESSING, STATUS} from '../../Actions/types';

const INITIAL_STATE = {
    cuisineData: []
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

        case CUISINE_DATA: {
            debugger
            return {
                ...state,
                cuisineData: payload
            }
        }
        default:
            return{
                state
            }
    }
}
