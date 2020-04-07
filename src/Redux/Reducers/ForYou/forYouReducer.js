import {FOR_YOU_DATA, PROCESSING, STATUS} from '../../Actions/types';

const INITIAL_STATE = {
    forYouTypeData: []
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

        case FOR_YOU_DATA: {
            return {
                forYouTypeData: payload
            }
        }
        default:
            return{
                state
            }
    }
}
