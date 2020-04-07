import {PROCESSING, STATUS} from './types'

export const processing = (dispatch, data = false) => {
  dispatch({
    type: PROCESSING,
    payload: data
  })
}

export const status = (dispatch, data = false) => {
  dispatch({
    type: STATUS,
    status: data
  })
}
