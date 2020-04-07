import { SAFE_AREA } from './types'

export const setSafeArea = (data) => {
  return (dispatch) => {
    dispatch({
      type: SAFE_AREA,
      payload: data
    })
  }
}
