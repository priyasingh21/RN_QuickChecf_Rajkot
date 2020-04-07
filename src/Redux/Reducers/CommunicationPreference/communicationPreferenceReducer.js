import {SET_COMMUNICATION_PREFERENCE, PROCESSING, STATUS} from '../../Actions/types';

const INITIAL_STATE = {
    communicationPrefData: []
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
      
        case SET_COMMUNICATION_PREFERENCE: {
            return {
                ...state,
                communicationPrefData: payload
            }
        }
        default:
            return{
                state
            }
    }
}
