import {
  SAFE_AREA,
  PROCESSING,
  STATUS
} from '../Actions/types'
import {common} from './initialState'

const INITIAL_STATE = common

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

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

    case SAFE_AREA:
      return {
        ...state,
        safeArea: action.payload
      }

    default:
      return state
  }
}
